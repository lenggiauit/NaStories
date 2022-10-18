using NaStories.API.Domain.Entities;
using NaStories.API.Domain.Helpers;
using NaStories.API.Domain.Services.Communication.Request;
using NaStories.API.Domain.Services.Communication.Request.Admin;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BlogPostFilterRequest = NaStories.API.Domain.Services.Communication.Request.Admin.BlogPostFilterRequest;

namespace NaStories.API.Domain.Services
{
    public interface IAdminService
    {
        Task<(List<Category>, ResultCode)> GetCategory(BaseRequest<CategoryFilterRequest> request);
        Task<ResultCode> CheckCategoryName(string name, Guid? categoryid);
        Task<(Category, ResultCode)> CreateEditCategory(BaseRequest<CreateEditCategoryRequest> request, Guid userId);
        Task<(List<BlogPost>, ResultCode)> GetBlogPost(BaseRequest<BlogPostFilterRequest> request);
        Task<ResultCode> CheckBlogPostTitle(string title, Guid? blogPostId);
        Task<(BlogPost, ResultCode)> CreateEditBlogPost(BaseRequest<CreateEditBlogPostRequest> request, Guid guid);
        Task<ResultCode> UpdateBlogPostStatus(BaseRequest<UpdateBlogPostStatusRequest> request, Guid userId);
        Task<(List<EventBookingDate>, ResultCode)> GetEventAvailableDate();
        Task<(EventBookingDate, ResultCode)> AddEditEventAvailableDate(BaseRequest<AddEventAvailableDateRequest> request, Guid userId);
        Task<ResultCode> RemoveEventAvailableDate(BaseRequest<RemoveEventAvailableDateRequest> request, Guid guid);
        Task<(List<PrivateTalk>, ResultCode)> GetPrivateTalkList(BaseRequest<GetPrivateTalkListFilterRequest> request);
        Task<(PrivateTalk, ResultCode)> GetPrivateTalkDetail(Guid payload);
    }
}
