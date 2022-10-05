using NaStories.API.Domain.Entities;
using NaStories.API.Domain.Helpers;
using NaStories.API.Domain.Services.Communication.Request;
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
    }
}
