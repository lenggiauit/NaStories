using NaStories.API.Domain.Entities;
using NaStories.API.Domain.Helpers;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NaStories.API.Domain.Services
{
    public interface IHomeService
    {
        Task<(List<YoutubeVideo>, ResultCode)> GetYoutubeVideos();
    }
}
