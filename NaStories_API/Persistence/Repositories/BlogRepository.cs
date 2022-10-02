using Microsoft.Extensions.Logging;
using NaStories.API.Domain.Entities;
using NaStories.API.Domain.Repositories;

namespace NaStories.API.Persistence.Repositories
{
    public class BlogRepository : BaseRepository, IBlogRepository
    {
        private readonly ILogger<BlogRepository> _logger;
        public BlogRepository(NaStoriesContext context, ILogger<BlogRepository> logger) : base(context)
        {
            _logger = logger;
        }
    }
}

