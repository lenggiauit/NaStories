using NaStories.API.Domain.Entities;
using NaStories.API.Domain.Helpers;
using NaStories.API.Domain.Services.Communication.Request;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NaStories.API.Domain.Repositories
{
    public interface IBlogRepository
    {
        Task<(List<Category>, ResultCode)> GetCategory();
        Task<(List<Tag>, ResultCode)> GetTags();
        Task<(List<BlogPost>, ResultCode)> GetTopPost();
        Task<(List<BlogPost>, ResultCode)> GetPosts(BaseRequest<BlogPostSearchRequest> request);
        Task<(BlogPost, ResultCode)> GetBlogPostDetail(string postUrl);
        Task<(List<BlogPost>, ResultCode)> GetRelatedPost(string categoryUrl, string notIn);
        Task<(List<Comment>, ResultCode)> GetComments(BaseRequest<CommmentRequest> request);
        Task<(Comment, ResultCode)> AddComment(BaseRequest<AddCommmentRequest> request, Guid userIds);
        Task<ResultCode> RemoveComment(BaseRequest<RemoveCommmentRequest> request, Guid userId);
    }
}
