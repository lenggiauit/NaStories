using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using NaStories.API.Domain.Entities;
using NaStories.API.Domain.Models;
using NaStories.API.Domain.Repositories;
using NaStories.API.Domain.Services.Communication.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NaStories.API.Persistence.Repositories
{
    public class RefRepository : BaseRepository, IRefRepository
    {
        private readonly ILogger<RefRepository> _logger;
        public RefRepository(NaStoriesContext context, ILogger<RefRepository> logger) : base(context)
        {
            _logger = logger;
        }
         
        
    }
}
