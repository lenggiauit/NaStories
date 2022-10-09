using NaStories.API.Domain.Entities;
using NaStories.API.Domain.Helpers;
using NaStories.API.Domain.Services.Communication.Request;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NaStories.API.Domain.Services
{
    public interface IBlogService
    {
        Task<(List<Category>, ResultCode)> GetCategory();
        Task<(List<Tag>, ResultCode)> GetTags();
        Task<(List<BlogPost>, ResultCode)> GetTopPost();
        Task<(List<BlogPost>, ResultCode)> GetPosts(BaseRequest<BlogPostSearchRequest> request);
        Task<(BlogPost, ResultCode)> GetBlogPostDetail(string postUrl);
        Task<(List<BlogPost>, ResultCode)> GetRelatedPost(string categoryUrl, string notIn);
    }
}
