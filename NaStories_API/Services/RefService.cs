using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using NaStories.API.Domain.Helpers;
using NaStories.API.Domain.Models;
using NaStories.API.Domain.Repositories;
using NaStories.API.Domain.Services;
using NaStories.API.Domain.Services.Communication.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NaStories.API.Services
{
    public class RefService : IRefService
    {
        private readonly IRefRepository _iRefRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly AppSettings _appSettings;
        private readonly ILogger<RefService> _logger;

        public RefService(IRefRepository iRefRepository, ILogger<RefService> logger, IUnitOfWork unitOfWork, IOptions<AppSettings> appSettings)
        {
            _iRefRepository = iRefRepository;
            _logger = logger;
            _unitOfWork = unitOfWork;
            _appSettings = appSettings.Value;
        }

         
         
    }
}
