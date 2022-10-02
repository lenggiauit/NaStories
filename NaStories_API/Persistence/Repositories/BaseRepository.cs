using NaStories.API.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NaStories.API.Persistence.Repositories
{
    public abstract class BaseRepository
    {
        protected readonly NaStoriesContext _context;

        protected BaseRepository(NaStoriesContext context)
        {
            _context = context;
        }
    }
}