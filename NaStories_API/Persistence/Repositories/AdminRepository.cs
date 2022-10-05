﻿using LinqKit;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using NaStories.API.Domain.Entities;
using NaStories.API.Domain.Helpers;
using NaStories.API.Domain.Repositories;
using NaStories.API.Domain.Services.Communication.Request;
using NaStories.API.Domain.Services.Communication.Request.Admin;
using NaStories.API.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using BlogPostFilterRequest = NaStories.API.Domain.Services.Communication.Request.Admin.BlogPostFilterRequest;

namespace NaStories.API.Persistence.Repositories
{
    public class AdminRepository : BaseRepository, IAdminRepository
    {
        private readonly ILogger<AdminRepository> _logger;
        public AdminRepository(NaStoriesContext context, ILogger<AdminRepository> logger) : base(context)
        {
            _logger = logger;
        }

        public async Task<(List<Category>, ResultCode)> GetCategory(BaseRequest<CategoryFilterRequest> request)
        {
            try
            {
                return (await _context.Category
                    .Where(p => p.IsArchived == request.Payload.IsArchived)
                    .AsNoTracking()
                    .OrderByDescending(x => x.UpdatedDate)
                    .GetPagingQueryable(request.MetaData)
                    .ToListAsync(), ResultCode.Success);

            }
            catch (Exception ex)
            {
                _logger.LogError("Error at GetCategory method: " + ex.Message);
                return (null, ResultCode.Error);
            }
        }

        public async Task<ResultCode> CheckCategoryName(string name, Guid? categoryid)
        {
            try
            {
                var predicate = PredicateBuilder.New<Category>();

                predicate.And(c => c.Name.Equals(name));

                if (categoryid != null)
                {
                    predicate.And(c => !c.Id.Equals(categoryid));
                }

                var existName = await _context.Category.AsNoTracking().Where(predicate)
                    .Select(u => new Category()
                    {
                        Id = u.Id
                    })
                    .FirstOrDefaultAsync();
                if (existName != null)
                {
                    return ResultCode.Invalid;
                }
                else
                {
                    return ResultCode.Valid;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("Error at CheckCategoryName method: " + ex.Message);
                return ResultCode.Error;

            }
        }

        public async Task<(Category, ResultCode)> CreateEditCategory(BaseRequest<CreateEditCategoryRequest> request, Guid userId)
        {
            try
            {
                if (request.Payload.Id.Equals(Guid.Empty))
                {
                    var category = new Category()
                    {
                        Id = Guid.NewGuid(),
                        Name = request.Payload.Name,
                        Url = Regex.Replace(request.Payload.Name.ToLower(), "[^a-zA-Z0-9]+", "-", RegexOptions.Compiled),
                        Description = request.Payload.Description,
                        Color = request.Payload.Color,
                        CreatedBy = userId,
                        CreatedDate = DateTime.Now,
                        IsArchived = request.Payload.IsArchived,
                    };
                    await _context.Category.AddAsync(category);
                    await _context.SaveChangesAsync();
                    return (category, ResultCode.Success);
                }
                else
                {
                    var category = await _context.Category.Where(c => c.Id.Equals(request.Payload.Id)).FirstOrDefaultAsync();
                    if (category != null)
                    {
                        category.Name = request.Payload.Name;
                        category.Url = Regex.Replace(request.Payload.Name.ToLower(), "[^a-zA-Z0-9]+", "-", RegexOptions.Compiled);
                        category.Description = request.Payload.Description;
                        category.Color = request.Payload.Color;
                        category.UpdatedBy = userId;
                        category.UpdatedDate = DateTime.Now;
                        category.IsArchived = request.Payload.IsArchived;
                    }
                    _context.Category.Update(category);
                    await _context.SaveChangesAsync();
                    return (category, ResultCode.Success);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("Error at CreateEditCategory method: " + ex.Message);
                return (null, ResultCode.Error);

            }
        }

        public async Task<ResultCode> CheckBlogPostTitle(string title, Guid? blogPostId)
        {
            try
            {
                var predicate = PredicateBuilder.New<BlogPost>();

                predicate.And(c => c.Title.Equals(title));

                if (blogPostId != null)
                {
                    predicate.And(c => !c.Id.Equals(blogPostId));
                }

                var existTitle = await _context.BlogPost.AsNoTracking().Where(predicate)
                    .Select(u => new BlogPost()
                    {
                        Id = u.Id
                    })
                    .FirstOrDefaultAsync();
                if (existTitle != null)
                {
                    return ResultCode.Invalid;
                }
                else
                {
                    return ResultCode.Valid;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("Error at CheckBlogPostTitle method: " + ex.Message);
                return ResultCode.Error;

            }
        }

        public async Task<(BlogPost, ResultCode)> CreateEditBlogPost(BaseRequest<CreateEditBlogPostRequest> request, Guid userId)
        {
            try
            {
                if (request.Payload.Id.Equals(Guid.Empty))
                {
                    Guid postId = Guid.NewGuid();
                    var post = new BlogPost()
                    {
                        Id = postId,
                        Title = request.Payload.Title,
                        Thumbnail = request.Payload.Thumbnail,
                        CategoryId = request.Payload.CategoryId,
                        Url = Regex.Replace(request.Payload.Title.ToLower(), "[^a-zA-Z0-9]+", "-", RegexOptions.Compiled),
                        ShortDescription = request.Payload.ShortDescription,
                        Content = request.Payload.Content,
                        CreatedBy = userId,
                        CreatedDate = DateTime.Now,
                        IsArchived = request.Payload.IsArchived,
                        IsDraft = request.Payload.IsDraft,
                        IsPublic = request.Payload.IsPublic,
                    };
                     
                    await _context.BlogPost.AddAsync(post);
                    if (request.Payload.Tags != null)
                    {
                        List<Tag> tags = new List<Tag>();
                        foreach (var name in request.Payload.Tags)
                        {
                            tags.Add(new Tag()
                            {
                                Id = Guid.NewGuid(),
                                Name = name,
                                Url = Regex.Replace(name, "[^a-zA-Z0-9]+", "-", RegexOptions.Compiled),
                                BlogPostId = postId
                            }) ; 
                        }
                        await _context.Tag.AddRangeAsync(tags);
                    }
                    await _context.SaveChangesAsync();
                    return (post, ResultCode.Success);
                }
                else
                {
                    var post = await _context.BlogPost.Where(c => c.Id.Equals(request.Payload.Id)).FirstOrDefaultAsync();
                    if (post != null)
                    {
                        post.Title = request.Payload.Title;
                        post.Thumbnail = request.Payload.Thumbnail;
                        post.CategoryId = request.Payload.CategoryId;
                        post.Url = Regex.Replace(request.Payload.Title.ToLower(), "[^a-zA-Z0-9]+", "-", RegexOptions.Compiled);
                        post.ShortDescription = request.Payload.ShortDescription;
                        post.Content = request.Payload.Content;
                        post.CreatedBy = userId;
                        post.CreatedDate = DateTime.Now;
                        post.IsArchived = request.Payload.IsArchived;
                        post.IsDraft = request.Payload.IsDraft;
                        post.IsPublic = request.Payload.IsPublic;

                        var oldTags = _context.Tag.Where(t => t.BlogPostId.Equals(post.Id)).ToList();
                        _context.Tag.RemoveRange(oldTags);

                        if (request.Payload.Tags != null)
                        {
                            List<Tag> tags = new List<Tag>();
                            foreach (var name in request.Payload.Tags)
                            {
                                tags.Add(new Tag()
                                {
                                    Id = Guid.NewGuid(),
                                    Name = name,
                                    Url = Regex.Replace(name, "[^a-zA-Z0-9]+", "-", RegexOptions.Compiled),
                                    BlogPostId = post.Id
                                });
                            }
                            await _context.Tag.AddRangeAsync(tags);
                        }

                    }
                    _context.BlogPost.Update(post);
                    await _context.SaveChangesAsync();
                    return (post, ResultCode.Success);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("Error at CreateEditCategory method: " + ex.Message);
                return (null, ResultCode.Error);

            }
        }

        public async Task<(List<BlogPost>, ResultCode)> GetBlogPost(BaseRequest<BlogPostFilterRequest> request)
        {
            try
            {
                var query = _context.BlogPost.AsQueryable();

                if (!string.IsNullOrEmpty(request.Payload.Keywords))
                {
                    query = query
                    .Where(p => p.Title.Contains(request.Payload.Keywords));

                }
                if (request.Payload.IsAll != null && !request.Payload.IsAll.Value)
                {
                    if (request.Payload.IsArchived != null && request.Payload.IsArchived.Value)
                    {
                        query = query
                        .Where(p => p.IsArchived == request.Payload.IsArchived);
                    }
                    if (request.Payload.IsPublic != null && request.Payload.IsPublic.Value)
                    {
                        query = query
                        .Where(p => p.IsPublic == request.Payload.IsPublic);
                    }
                    if (request.Payload.IsDraft != null && request.Payload.IsDraft.Value)
                    {
                        query = query
                       .Where(p => p.IsDraft == request.Payload.IsDraft);
                    }
                }

                var totalRow = await query.CountAsync();

                return (await query 
                  .AsNoTracking()
                  .OrderByDescending(x => x.UpdatedDate)
                  .Include(p => p.Category)
                  .Include(p => p.Tags)
                  .Select(p =>  new BlogPost() { 
                    Id = p.Id,
                    Title = p.Title,    
                    CategoryId = p.CategoryId,
                    Category = p.Category,
                    Content = p.Content,
                    TotalRows = totalRow,
                    Thumbnail = p.Thumbnail,
                    ShortDescription = p.ShortDescription,
                    CreatedBy = p.CreatedBy,
                    UpdatedBy  = p.UpdatedBy,
                    CreatedDate = p.CreatedDate,
                    UpdatedDate = p.UpdatedDate,
                    Url = p.Url,
                    IsArchived = p.IsArchived,
                    IsDraft = p.IsDraft,
                    IsPublic = p.IsPublic,
                    View = p.View,
                    Comment = p.Comment,
                    Tags = p.Tags
                  })
                  
                  .GetPagingQueryable(request.MetaData) 
                  .ToListAsync(), ResultCode.Success);


            }
            catch (Exception ex)
            {
                _logger.LogError("Error at GetBlogPost method: " + ex.Message);
                return (null, ResultCode.Error);
            }
        }

        public async Task<ResultCode> UpdateBlogPostStatus(BaseRequest<UpdateBlogPostStatusRequest> request, Guid userId)
        {
            try
            {
                var post = await _context.BlogPost.Where(c => c.Id.Equals(request.Payload.Id)).FirstOrDefaultAsync();
                if (post != null)
                {
                    switch (request.Payload.Status.ToLower())
                    {
                        case "published":
                            {
                                post.IsArchived = false;
                                post.IsDraft = false;
                                post.IsPublic = true;
                                break;
                            }
                        case "draft":
                            {
                                post.IsArchived = false;
                                post.IsDraft = true;
                                post.IsPublic = false;
                                break;
                            }
                        case "archived":
                            {
                                post.IsArchived = true;
                                post.IsDraft = false;
                                post.IsPublic = false;
                                break;
                            }
                    }

                    
                }
                _context.BlogPost.Update(post);
                await _context.SaveChangesAsync();
                return ResultCode.Success;
            }
            catch (Exception ex)
            {
                _logger.LogError("Error at UpdateBlogPostStatus method: " + ex.Message);
                return (ResultCode.Error);
            }
        }
    }
}
