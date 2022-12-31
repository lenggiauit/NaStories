using LinqKit;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using NaStories.API.Domain.Entities;
using NaStories.API.Domain.Helpers;
using NaStories.API.Domain.Repositories;
using NaStories.API.Domain.Services.Communication.Request;
using NaStories.API.Domain.Services.Communication.Request.Admin;
using NaStories.API.Extensions;
using NaStories.API.Resources;
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
                        Url = Regex.Replace(Utilities.RemoveSign4VietnameseString(request.Payload.Title.ToLower()), "[^a-zA-Z0-9]+", "-", RegexOptions.Compiled),
                        ShortDescription = request.Payload.ShortDescription,
                        Content = request.Payload.Content,
                        CreatedBy = userId,
                        UserId = userId,
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
                                Url = Regex.Replace(Utilities.RemoveSign4VietnameseString(name), "[^a-zA-Z0-9]+", "-", RegexOptions.Compiled),
                                BlogPostId = postId
                            });
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
                        post.Url = Regex.Replace(Utilities.RemoveSign4VietnameseString(request.Payload.Title.ToLower()), "[^a-zA-Z0-9]+", "-", RegexOptions.Compiled);
                        post.ShortDescription = request.Payload.ShortDescription;
                        post.Content = request.Payload.Content;
                        post.CreatedBy = userId;
                        post.UserId = userId;
                        post.UpdatedDate = DateTime.Now;
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
                                    Url = Regex.Replace(Utilities.RemoveSign4VietnameseString(name), "[^a-zA-Z0-9]+", "-", RegexOptions.Compiled),
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
                  .Select(p => new BlogPost()
                  {
                      Id = p.Id,
                      Title = p.Title,
                      CategoryId = p.CategoryId,
                      Category = p.Category,
                      Content = p.Content,
                      TotalRows = totalRow,
                      Thumbnail = p.Thumbnail,
                      ShortDescription = p.ShortDescription,
                      CreatedBy = p.CreatedBy,
                      UpdatedBy = p.UpdatedBy,
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
                  .OrderByDescending(p => p.CreatedDate)
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

        public async Task<(List<EventBookingDate>, ResultCode)> GetEventAvailableDate(int adjustmentDays)
        {
            try
            {
                return (await _context.EventBookingDate
                    .Where(e => e.Start > DateTime.UtcNow.AddDays(-30))
                    .Include(e => e.User)
                    .OrderBy(e => e.Start)
                    .AsNoTracking()
                    .ToListAsync(), ResultCode.Success);
            }
            catch (Exception ex)
            {
                _logger.LogError("Error at GetEventAvailableDate method: " + ex.Message);
                return (null, ResultCode.Error);
            }
        }

        public async Task<(EventBookingDate, ResultCode)> AddEditEventAvailableDate(BaseRequest<AddEventAvailableDateRequest> request, Guid userId)
        {
            try
            {
                var bookingDate = await _context.EventBookingDate.Where(e => e.Id.Equals(request.Payload.Id)).FirstOrDefaultAsync();

                if (bookingDate != null)
                {
                    bookingDate.Title = request.Payload.Title;
                    bookingDate.Start = request.Payload.Start;
                    bookingDate.End = request.Payload.End;
                    _context.EventBookingDate.Update(bookingDate);
                }
                else
                {
                    bookingDate = new EventBookingDate()
                    {
                        Id = Guid.NewGuid(),
                        Title = request.Payload.Title,
                        Start = request.Payload.Start,
                        End = request.Payload.End,
                    };

                    await _context.EventBookingDate.AddAsync(bookingDate);
                }
                await _context.SaveChangesAsync();
                return (bookingDate, ResultCode.Success);
            }
            catch (Exception ex)
            {
                _logger.LogError("Error at AddEditEventAvailableDate method: " + ex.Message);
                return (null, ResultCode.Error);
            }

        }

        public async Task<ResultCode> RemoveEventAvailableDate(BaseRequest<RemoveEventAvailableDateRequest> request, Guid userId)
        {
            try
            {
                var bookingDate = await _context.EventBookingDate.Where(e => e.Id.Equals(request.Payload.Id)).FirstOrDefaultAsync();

                if (bookingDate != null)
                {
                    _context.EventBookingDate.Remove(bookingDate);
                    await _context.SaveChangesAsync();
                    return (ResultCode.Success);
                }
                else
                {
                    return (ResultCode.Invalid);
                }

            }
            catch (Exception ex)
            {
                _logger.LogError("Error at RemoveEventAvailableDate method: " + ex.Message);
                return (ResultCode.Error);
            }
        }

        public async Task<(List<PrivateTalk>, ResultCode)> GetPrivateTalkList(BaseRequest<GetPrivateTalkListFilterRequest> request)
        {
            try
            {
                var query = _context.PrivateTalk.AsQueryable();

                if (!string.IsNullOrEmpty(request.Payload.EventStatus))
                {
                    query = query
                    .Where(p => p.EventStatus.ToLower().Equals(request.Payload.EventStatus.ToLower()));

                }


                var totalRow = await query.CountAsync();

                return (await query
                  .AsNoTracking()
                  .OrderByDescending(x => x.CreatedDate)
                  .Include(x => x.User)
                  .Include(x => x.EventBookingDate) 
                  .Select(x => new PrivateTalk()
                  {
                      Id = x.Id,
                      Code = x.Code,
                      RedeemCode = x.RedeemCode,
                      EventRequestChangeReason = x.EventRequestChangeReason,
                      EventBookingDate = x.EventBookingDate,
                      EventCancelReason = x.EventCancelReason,
                      AgeRange = x.AgeRange,
                      CreatedBy = x.CreatedBy,
                      CreatedDate = x.CreatedDate,
                      Email = x.Email,
                      EventStatus = x.EventStatus,
                      FullName = x.FullName,
                      IsDeleted = x.IsDeleted,
                      Problem = x.Problem,
                      ProblemDescription = x.ProblemDescription,
                      ProblemOther = x.ProblemOther,
                      RequestChangeCount = x.RequestChangeCount,
                      User = x.User,
                      UpdatedBy = x.UpdatedBy,
                      UpdatedDate = x.UpdatedDate,
                      YourExpectationDescription = x.YourExpectationDescription,
                      YourSolutionDescription = x.YourSolutionDescription,
                      TotalRows = totalRow,

                  })
                  .GetPagingQueryable(request.MetaData)
                  .ToListAsync(), ResultCode.Success);


            }
            catch (Exception ex)
            {
                _logger.LogError("Error at GetPrivateTalkList method: " + ex.Message);
                return (null, ResultCode.Error);
            }
        }

        public async Task<(PrivateTalk, ResultCode)> GetPrivateTalkDetail(Guid id)
        {
            try
            {

                var eventRequestChangeReason = await _context.EventRequestChangeReason.Where(e => e.PrivateTalkId.Equals(id)).OrderByDescending(e=> e.CreateDate).FirstOrDefaultAsync();
                if (eventRequestChangeReason != null) {
                    
                    var eventBookingDate = await _context.EventBookingDate.Where(e => e.Id.Equals(eventRequestChangeReason.EventBookingDateId)).OrderByDescending(e => e.CreatedDate).FirstOrDefaultAsync();
                    eventRequestChangeReason.EventBookingDate = eventBookingDate;
                }
                 
                var eventCancelReason = await _context.EventCancelReason.Where(e => e.PrivateTalkId.Equals(id)).FirstOrDefaultAsync();
                 
                return (await _context.PrivateTalk
                  .AsNoTracking() 
                  .Include(x => x.User)
                  .Include(x => x.EventBookingDate)
                  .Select(x => new PrivateTalk()
                  {
                      Id = x.Id,
                      Code = x.Code,
                      RedeemCode = x.RedeemCode,
                      EventRequestChangeReason = eventRequestChangeReason,
                      EventBookingDate = x.EventBookingDate,
                      EventCancelReason = eventCancelReason,
                      AgeRange = x.AgeRange,
                      CreatedBy = x.CreatedBy,
                      CreatedDate = x.CreatedDate,
                      Email = x.Email,
                      EventStatus = x.EventStatus,
                      FullName = x.FullName,
                      IsDeleted = x.IsDeleted,
                      Problem = x.Problem,
                      ProblemDescription = x.ProblemDescription,
                      ProblemOther = x.ProblemOther,
                      RequestChangeCount = x.RequestChangeCount,
                      User = x.User,
                      UpdatedBy = x.UpdatedBy,
                      UpdatedDate = x.UpdatedDate,
                      YourExpectationDescription = x.YourExpectationDescription,
                      YourSolutionDescription = x.YourSolutionDescription, 

                  }) 
                  .Where(x => x.Id.Equals(id))
                  .FirstOrDefaultAsync(), ResultCode.Success);


            }
            catch (Exception ex)
            {
                _logger.LogError("Error at GetPrivateTalkDetail method: " + ex.Message);
                return (null, ResultCode.Error);
            }
        }

        public async Task<ResultCode> UpdatePrivateTalkStatus(UpdatePrivateTalkStatusRequest payload, Guid userId)
        {
            try
            {
               
                var privateTalk = await _context.PrivateTalk.Where(c => c.Id.Equals(payload.Id)).FirstOrDefaultAsync();
                if (privateTalk != null)
                {
                    var oldEventBookingDateId = privateTalk.EventBookingDateId;
                    if (!string.IsNullOrEmpty(payload.Status))
                    {
                        privateTalk.EventStatus = payload.Status;

                        // send notification
                        var newNotify = new Notification()
                        {
                            Id = Guid.NewGuid(),
                            CreatedDate = DateTime.Now,
                            Message = "Private Talk đã chuyển sang trạng thái: " + ((PrivateTalkStatusEnum)Enum.Parse(typeof(PrivateTalkStatusEnum), payload.Status)).ToDescriptionString(),
                            UserId = privateTalk.UserId,
                        };
                        await _context.Notification.AddAsync(newNotify);

                        if ((PrivateTalkStatusEnum)Enum.Parse(typeof(PrivateTalkStatusEnum), payload.Status) == PrivateTalkStatusEnum.Canceled)
                        {
                            var oldBookingDate = await _context.EventBookingDate.Where(b => b.Id.Equals(oldEventBookingDateId)).FirstOrDefaultAsync();
                            if (oldBookingDate != null)
                            {
                                oldBookingDate.UserId = null;
                                oldBookingDate.Title = "Available time";
                                oldBookingDate.EventName = "";
                                oldBookingDate.UpdatedDate = DateTime.Now;
                                _context.EventBookingDate.Update(oldBookingDate);
                            }
                            privateTalk.EventBookingDateId = null;

                        }
                    }
                    if ( payload.EventBookingDateId != null && payload.EventBookingDateId != Guid.Empty)
                        privateTalk.EventBookingDateId = payload.EventBookingDateId;

                    _context.PrivateTalk.Update(privateTalk);

                    if ( (string.IsNullOrEmpty(payload.Status) || 
                        !string.IsNullOrEmpty(payload.Status) && (PrivateTalkStatusEnum)Enum.Parse(typeof(PrivateTalkStatusEnum), payload.Status) != PrivateTalkStatusEnum.Canceled ) 
                        &&  payload.EventBookingDateId != null && !payload.EventBookingDateId.Equals(Guid.Empty))
                    {
                        var oldBookingDate = await _context.EventBookingDate.Where(b => b.Id.Equals(oldEventBookingDateId)).FirstOrDefaultAsync();
                        if(oldBookingDate != null)
                        {
                            oldBookingDate.UserId = null;
                            oldBookingDate.Title = "Available time";
                            oldBookingDate.EventName = "";
                            oldBookingDate.UpdatedDate = DateTime.Now;
                            _context.EventBookingDate.Update(oldBookingDate);
                        }
                        var bookingDate = await _context.EventBookingDate.Where(b => b.Id.Equals(payload.EventBookingDateId)).FirstOrDefaultAsync();

                        if (bookingDate != null)
                        {
                            bookingDate.UserId = userId;
                            bookingDate.Title = "Private Talk - " + privateTalk.FullName;
                            bookingDate.EventName = "Private Talk";
                            bookingDate.UpdatedDate = DateTime.Now;
                            _context.EventBookingDate.Update(bookingDate);
                        } 
                    }

                    


                    await _context.SaveChangesAsync();
                    return ResultCode.Success;
                }
                else
                {
                    return ResultCode.Error;
                } 
            }
            catch (Exception ex)
            {
                _logger.LogError("Error at UpdatePrivateTalkStatus method: " + ex.Message);
                return ResultCode.Error;
            }
        }

        public async Task<Guid> GetPrivateTalkIdByEventBookingDate(GetPrivateTalkIdByEventBookingDateRequest payload, Guid userId)
        {
            try
            { 
                var privateTalk = await _context.PrivateTalk.Where(c => !c.IsDeleted && c.EventBookingDateId.Equals(payload.EventBookingDateId)).FirstOrDefaultAsync();
                if (privateTalk != null)
                { 
                    return privateTalk.Id;
                }
                else
                {
                    return Guid.Empty;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("Error at GetPrivateTalkIdByEventBookingDate method: " + ex.Message);
                return Guid.Empty;
            }
        }

        public async Task<(List<MockInterview>, ResultCode)> GetMockInterviewList(BaseRequest<GetMockInterviewListFilterRequest> request)
        {
            try
            {
                var query = _context.MockInterview.AsQueryable();

                if (!string.IsNullOrEmpty(request.Payload.EventStatus))
                {
                    query = query
                    .Where(p => p.EventStatus.ToLower().Equals(request.Payload.EventStatus.ToLower()));

                }


                var totalRow = await query.CountAsync();

                return (await query
                  .AsNoTracking()
                  .OrderByDescending(x => x.CreatedDate)
                  .Include(x => x.User)
                  .Include(x => x.EventBookingDate)
                  .Select(x => new MockInterview()
                  {
                      Id = x.Id,
                      Code = x.Code,
                      RedeemCode = x.RedeemCode,    
                      EventRequestChangeReason = x.EventRequestChangeReason,
                      EventBookingDate = x.EventBookingDate,
                      EventCancelReason = x.EventCancelReason,
                      AgeRange = x.AgeRange,
                      CreatedBy = x.CreatedBy,
                      CreatedDate = x.CreatedDate,
                      Email = x.Email,
                      EventStatus = x.EventStatus,
                      FullName = x.FullName,
                      IsDeleted = x.IsDeleted,
                      Language = x.Language,
                      Resume = x.Resume,
                      CoverLetter = x.CoverLetter,
                      RequestChangeCount = x.RequestChangeCount,
                      User = x.User,
                      UpdatedBy = x.UpdatedBy,
                      UpdatedDate = x.UpdatedDate,
                      JobDescription = x.JobDescription,
                      Note = x.Note,
                      TotalRows = totalRow,

                  })
                  .GetPagingQueryable(request.MetaData)
                  .ToListAsync(), ResultCode.Success);


            }
            catch (Exception ex)
            {
                _logger.LogError("Error at GetMockInterviewList method: " + ex.Message);
                return (null, ResultCode.Error);
            }
        }

        public async Task<(MockInterview, ResultCode)> GetMockInterviewDetail(Guid id)
        {
            try
            {

                var eventRequestChangeReason = await _context.EventRequestChangeReason.Where(e => e.MockInterviewId.Equals(id)).OrderByDescending(e => e.CreateDate ).FirstOrDefaultAsync();
                if (eventRequestChangeReason != null)
                {

                    var eventBookingDate = await _context.EventBookingDate.Where(e => e.Id.Equals(eventRequestChangeReason.EventBookingDateId)).OrderByDescending(e => e.CreatedDate).FirstOrDefaultAsync();
                    eventRequestChangeReason.EventBookingDate = eventBookingDate;
                }

                var eventCancelReason = await _context.EventCancelReason.Where(e => e.PrivateTalkId.Equals(id)).FirstOrDefaultAsync();

                return (await _context.MockInterview
                  .AsNoTracking()
                  .Include(x => x.User)
                  .Include(x => x.EventBookingDate)
                  .Select(x => new MockInterview()
                  {
                      Id = x.Id,
                      Code = x.Code,
                      RedeemCode = x.RedeemCode,
                      EventRequestChangeReason = eventRequestChangeReason,
                      EventBookingDate = x.EventBookingDate,
                      EventCancelReason = eventCancelReason,
                      AgeRange = x.AgeRange,
                      CreatedBy = x.CreatedBy,
                      CreatedDate = x.CreatedDate,
                      Email = x.Email,
                      EventStatus = x.EventStatus,
                      FullName = x.FullName,
                      IsDeleted = x.IsDeleted,
                      Language = x.Language,
                      Resume = x.Resume,
                      CoverLetter = x.CoverLetter,
                      RequestChangeCount = x.RequestChangeCount,
                      User = x.User,
                      UpdatedBy = x.UpdatedBy,
                      UpdatedDate = x.UpdatedDate,
                      JobDescription = x.JobDescription,
                      Note = x.Note,

                  })
                  .Where(x => x.Id.Equals(id))
                  .FirstOrDefaultAsync(), ResultCode.Success);


            }
            catch (Exception ex)
            {
                _logger.LogError("Error at GetMockInterviewDetail method: " + ex.Message);
                return (null, ResultCode.Error);
            }
        }

        public async Task<ResultCode> UpdateMockInterviewStatus(UpdateMockInterviewStatusRequest payload, Guid userId)
        {
            try
            {

                var mockInterview = await _context.MockInterview.Where(c => c.Id.Equals(payload.Id)).FirstOrDefaultAsync();
                if (mockInterview != null)
                {
                    var oldEventBookingDateId = mockInterview.EventBookingDateId;
                    if (!string.IsNullOrEmpty(payload.Status))
                    {
                        mockInterview.EventStatus = payload.Status;

                        // send notification
                        var newNotify = new Notification()
                        {
                            Id = Guid.NewGuid(),
                            CreatedDate = DateTime.Now,
                            Message = "Mock Interview đã chuyển sang trạng thái: " + ((MockInterviewStatusEnum)Enum.Parse(typeof(MockInterviewStatusEnum), payload.Status)).ToDescriptionString() ,
                            UserId = mockInterview.UserId,
                        };
                        await _context.Notification.AddAsync(newNotify);
                         

                        if ((MockInterviewStatusEnum)Enum.Parse(typeof(MockInterviewStatusEnum), payload.Status) == MockInterviewStatusEnum.Canceled)
                        {
                            var oldBookingDate = await _context.EventBookingDate.Where(b => b.Id.Equals(oldEventBookingDateId)).FirstOrDefaultAsync();
                            if (oldBookingDate != null)
                            {
                                oldBookingDate.UserId = null;
                                oldBookingDate.Title = "Available time";
                                oldBookingDate.EventName = "";
                                oldBookingDate.UpdatedDate = DateTime.Now;
                                _context.EventBookingDate.Update(oldBookingDate);
                            }
                            mockInterview.EventBookingDateId = null;

                        }
                    }
                    if (payload.EventBookingDateId != null && payload.EventBookingDateId != Guid.Empty)
                        mockInterview.EventBookingDateId = payload.EventBookingDateId;

                    _context.MockInterview.Update(mockInterview);

                    if ( 
                        (string.IsNullOrEmpty(payload.Status) || 
                        !string.IsNullOrEmpty(payload.Status) && (MockInterviewStatusEnum)Enum.Parse(typeof(MockInterviewStatusEnum), payload.Status) != MockInterviewStatusEnum.Canceled)  
                        && 
                        payload.EventBookingDateId != null && !payload.EventBookingDateId.Equals(Guid.Empty))
                    {
                        var oldBookingDate = await _context.EventBookingDate.Where(b => b.Id.Equals(oldEventBookingDateId)).FirstOrDefaultAsync();
                        if (oldBookingDate != null)
                        {
                            oldBookingDate.UserId = null;
                            oldBookingDate.Title = "Available time";
                            oldBookingDate.EventName = "";
                            oldBookingDate.UpdatedDate = DateTime.Now;
                            _context.EventBookingDate.Update(oldBookingDate);
                        }
                        var bookingDate = await _context.EventBookingDate.Where(b => b.Id.Equals(payload.EventBookingDateId)).FirstOrDefaultAsync();

                        if (bookingDate != null)
                        {
                            bookingDate.UserId = userId;
                            bookingDate.Title = "Mock Interview - " + mockInterview.FullName;
                            bookingDate.EventName = "Mock Interview";
                            bookingDate.UpdatedDate = DateTime.Now;
                            _context.EventBookingDate.Update(bookingDate);
                        }
                    }


                    await _context.SaveChangesAsync();
                    return ResultCode.Success;
                }
                else
                {
                    return ResultCode.Error;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("Error at UpdateMockInterviewStatus method: " + ex.Message);
                return ResultCode.Error;
            }
        }

        public async Task<Guid> GetMockInterviewIdByEventBookingDate(GetMockInterviewIdByEventBookingDateRequest payload, Guid userId)
        {
            try
            {
                var mockInterview = await _context.MockInterview.Where(c => !c.IsDeleted && c.EventBookingDateId.Equals(payload.EventBookingDateId)).FirstOrDefaultAsync();
                if (mockInterview != null)
                {
                    return mockInterview.Id;
                }
                else
                {
                    return Guid.Empty;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("Error at GetMockInterviewIdByEventBookingDate method: " + ex.Message);
                return Guid.Empty;
            }
        }

        public async Task<ResultCode> CancelMockInterview(Guid payload, Guid userId)
        {
            try
            {

                var mockInterview = await _context.MockInterview.Where(c => c.Id.Equals(payload)).FirstOrDefaultAsync();
                if (mockInterview != null)
                {
                    var oldEventBookingDateId = mockInterview.EventBookingDateId;
                    mockInterview.EventBookingDateId = null; 
                    _context.MockInterview.Update(mockInterview);

                    if (oldEventBookingDateId != null && !oldEventBookingDateId.Equals(Guid.Empty))
                    {
                        var oldBookingDate = await _context.EventBookingDate.Where(b => b.Id.Equals(oldEventBookingDateId)).FirstOrDefaultAsync();
                        if (oldBookingDate != null)
                        {
                            oldBookingDate.UserId = null;
                            oldBookingDate.Title = "Available time";
                            oldBookingDate.EventName = "";
                            oldBookingDate.UpdatedDate = DateTime.Now;
                            _context.EventBookingDate.Update(oldBookingDate);
                        }
                         
                    }
                     
                    await _context.SaveChangesAsync();
                    return ResultCode.Success;
                }
                else
                {
                    return ResultCode.Error;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("Error at CancelMockInterview method: " + ex.Message);
                return ResultCode.Error;
            }
        }

        public async Task<ResultCode> CancelPrivateTalk(Guid payload, Guid userId)
        {
            try
            {

                var privateTalk = await _context.PrivateTalk.Where(c => c.Id.Equals(payload)).FirstOrDefaultAsync();
                if (privateTalk != null)
                {
                    var oldEventBookingDateId = privateTalk.EventBookingDateId;
                    privateTalk.EventBookingDateId = null;
                    _context.PrivateTalk.Update(privateTalk);

                    if (oldEventBookingDateId != null && !oldEventBookingDateId.Equals(Guid.Empty))
                    {
                        var oldBookingDate = await _context.EventBookingDate.Where(b => b.Id.Equals(oldEventBookingDateId)).FirstOrDefaultAsync();
                        if (oldBookingDate != null)
                        {
                            oldBookingDate.UserId = null;
                            oldBookingDate.Title = "Available time";
                            oldBookingDate.EventName = "";
                            oldBookingDate.UpdatedDate = DateTime.Now;
                            _context.EventBookingDate.Update(oldBookingDate);
                        } 
                    }

                    await _context.SaveChangesAsync();
                    return ResultCode.Success;
                }
                else
                {
                    return ResultCode.Error;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("Error at CancelMockInterview method: " + ex.Message);
                return ResultCode.Error;
            }
        }

        public async Task<(List<User>, ResultCode)> GetUserList()
        {
            try
            { 
                return ( await _context.User
                  .AsNoTracking()
                  .ToListAsync(),ResultCode.Success); 

            }
            catch (Exception ex)
            {
                _logger.LogError("Error at GetUserList method: " + ex.Message);
                return (null, ResultCode.Error);
            }
        }

        public async Task<ResultCode> DeleteReasonChangeMockInterview(Guid id, Guid userId)
        {
            try
            {
                var listReason = await _context.EventRequestChangeReason.Where(r => r.MockInterviewId == id).ToListAsync();
                if(listReason .Count > 0)
                {
                     _context.EventRequestChangeReason.RemoveRange(listReason);
                    await _context.SaveChangesAsync();
                }

                return  ResultCode.Success; 
            }
            catch (Exception ex)
            {
                _logger.LogError("Error at DeleteReasonChangeMockInterview method: " + ex.Message);
                return ResultCode.Error;
            }
        }

        public async Task<ResultCode> DeleteReasonChangePrivateTalk(Guid id, Guid userId)
        {
            try
            {
                var listReason = await _context.EventRequestChangeReason.Where(r => r.PrivateTalkId == id).ToListAsync();
                if (listReason.Count > 0)
                {
                    _context.EventRequestChangeReason.RemoveRange(listReason);
                    await _context.SaveChangesAsync();
                }

                return ResultCode.Success;
            }
            catch (Exception ex)
            {
                _logger.LogError("Error at DeleteReasonChangePrivateTalk method: " + ex.Message);
                return ResultCode.Error;
            }
        }
    }
}
