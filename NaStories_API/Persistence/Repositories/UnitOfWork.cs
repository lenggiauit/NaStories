using NaStories.API.Domain.Entities;
using NaStories.API.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NaStories.API.Persistence.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly NaStoriesContext _context;
        public UnitOfWork(NaStoriesContext context)
        {
            _context = context;
        }
        public async Task CompleteAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}