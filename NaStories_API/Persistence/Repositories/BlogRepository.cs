using LinqKit;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using NaStories.API.Domain.Entities;
using NaStories.API.Domain.Helpers;
using NaStories.API.Domain.Repositories;
using NaStories.API.Domain.Services.Communication.Request;
using NaStories.API.Extensions;
using System;
using System.Collections.Generic;
using System.Linq; 
using System.Threading.Tasks;

namespace NaStories.API.Persistence.Repositories
{
    public class BlogRepository : BaseRepository, IBlogRepository
    {
        private readonly ILogger<BlogRepository> _logger;
        public BlogRepository(NaStoriesContext context, ILogger<BlogRepository> logger) : base(context)
        {
            _logger = logger;
        }

        public async Task<(BlogPost, ResultCode)> GetBlogPostDetail(string postUrl)
        {
            try
            { 
                return (await _context.BlogPost
                    .AsNoTracking()
                    .Include(p => p.Category)
                    .Include(p => p.Tags)
                    .Include(p => p.User)
                    .AsNoTracking()
                    .Where(p => p.Url.Equals(postUrl))
                    .Select(p => new BlogPost()
                    {
                        Title = p.Title,
                        Thumbnail = p.Thumbnail,
                        ShortDescription = p.ShortDescription,
                        Url = p.Url,
                        View = p.View,
                        Comment = p.Comment,
                        UpdatedDate = p.UpdatedDate,
                        CreatedDate = p.CreatedDate,
                        Category = p.Category,
                        Tags = p.Tags,
                        User = p.User,
                        Content = p.Content,
                        
                    }) 
                    .FirstOrDefaultAsync(), ResultCode.Success);

            }
            catch (Exception ex)
            {
                _logger.LogError("Error at GetBlogPostDetail method: " + ex.Message);
                return (null, ResultCode.Error);
            }
        }

        public async Task<(List<Category>, ResultCode)> GetCategory()
        {
            try
            {
                return (await _context.Category
                    .AsNoTracking()
                    .AsQueryable()
                    .Where(c => !c.IsArchived)
                    .Select(c => new Category()
                    { 
                        Name = c.Name,
                        Color = c.Color,
                        Url = c.Url
                    })  
                    .ToListAsync(), ResultCode.Success);

            }
            catch (Exception ex)
            {
                _logger.LogError("Error at GetCategory method: " + ex.Message);
                return (null, ResultCode.Error);
            }
        }

        public async Task<(List<BlogPost>, ResultCode)> GetPosts(BaseRequest<BlogPostSearchRequest> request)
        {
            try
            {
                var query = _context.BlogPost.AsQueryable();

                if (!string.IsNullOrEmpty(request.Payload.Keywords))
                {
                    query = query
                    .Where(p => p.Title.Contains(request.Payload.Keywords)); 
                }

                var totalRow = await query.Where(p => p.IsPublic).CountAsync();

                return (await query
                    .Include(p => p.Category)
                    .Include(p => p.Tags)
                    .AsNoTracking() 
                    .Where(p => p.IsPublic)
                    .Select(p => new BlogPost()
                    {
                        Title = p.Title,
                        Thumbnail = p.Thumbnail,
                        ShortDescription = p.ShortDescription,
                        Url = p.Url,
                        View = p.View,
                        Comment = p.Comment,
                        UpdatedDate = p.UpdatedDate,
                        CreatedDate = p.CreatedDate,
                        Category = p.Category,
                        Tags = p.Tags,
                        TotalRows = totalRow
                    })
                    .OrderBy(p => p.CreatedDate)
                    .OrderBy(p => p.UpdatedDate)  
                    .GetPagingQueryable(request.MetaData)
                    .ToListAsync(), ResultCode.Success);

            }
            catch (Exception ex)
            {
                _logger.LogError("Error at GetTopPost method: " + ex.Message);
                return (null, ResultCode.Error);
            }
        }

        public async Task<(List<BlogPost>, ResultCode)> GetRelatedPost(string categoryUrl, string notIn)
        {
            try
            {
                return (await _context.BlogPost
                    
                    .AsNoTracking()
                    .AsQueryable()
                    .Where(p => !p.IsArchived && !p.Url.Equals(notIn))
                    .Join(_context.Category.Where(c => c.Url.Equals(categoryUrl)), p => p.CategoryId, c => c.Id, (p, c) => p)
                    .Select(p => new BlogPost()
                    {
                        Title = p.Title, 
                        Url = p.Url,
                        View = p.View,
                        Comment = p.Comment
                    })
                    .OrderBy(p => p.View)
                    .OrderBy(p => p.Comment)
                    .Take(5)
                    .ToListAsync(), ResultCode.Success);

            }
            catch (Exception ex)
            {
                _logger.LogError("Error at GetRelatedPost method: " + ex.Message);
                return (null, ResultCode.Error);
            }
        }

        public async Task<(List<Tag>, ResultCode)> GetTags()
        {
            try
            {
                return await Task.FromResult( ( _context.Tag
                    .AsNoTracking()
                    .AsQueryable()
                    .AsEnumerable()
                    .Select(t => new Tag()
                    {
                        Id = t.Id,
                        Name = t.Name, 
                        Url = t.Url
                    }) 
                    .OrderBy(c => Guid.NewGuid()) 
                    .GroupBy(x => x.Name).Select(x => x.First())
                    .Distinct() 
                    .Take(15) 
                    .ToList(), ResultCode.Success));

            }
            catch (Exception ex)
            {
                _logger.LogError("Error at GetTags method: " + ex.Message);
                return (null, ResultCode.Error);
            }
        }

        public async Task<(List<BlogPost>, ResultCode)> GetTopPost()
        {
            try
            {
                return (await _context.BlogPost
                    .AsNoTracking()
                    .AsQueryable() 
                    .Where(p => p.IsPublic)
                    .Select(p => new BlogPost()
                    { 
                        Title = p.Title,
                        Thumbnail = p.Thumbnail,
                        ShortDescription = p.ShortDescription, 
                        Url = p.Url,
                        View = p.View,
                        Comment = p.Comment,
                    })
                    .OrderBy(p => p.View)
                    .OrderBy(p => p.Comment)
                    .Distinct()
                    .Take(10)
                    .ToListAsync(), ResultCode.Success);

            }
            catch (Exception ex)
            {
                _logger.LogError("Error at GetTopPost method: " + ex.Message);
                return (null, ResultCode.Error);
            }
        }
    }
}

