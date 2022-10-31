using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using NaStories.API.Domain.Helpers;
using NaStories.API.Domain.Models;
using NaStories.API.Domain.Services;
using NaStories.API.Domain.Services.Communication.Request;
using NaStories.API.Domain.Services.Communication.Response;
using NaStories.API.Infrastructure;
using NaStories.API.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NaStories.API.Controllers
{
    [Authorize]
    [Route("Ref")]
    public class RefController : BaseController
    {
        private readonly IRefService _refServices;
        private readonly ILogger<RefController> _logger;
        private readonly AppSettings _appSettings;
        private IMapper _mapper;
        public RefController(
            ILogger<RefController> logger,
            IMapper mapper,
            IRefService refServices,
            IOptions<AppSettings> appSettings)
        {
            _refServices = refServices;
            _logger = logger;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        [AllowAnonymous]
        [HttpPost("Encrypt")]
        public Task<string> Encrypt(string text)
        {
            return Task.FromResult( EncryptionHelper.Encrypt(text, "nastories_email_key6385937"));
        }
        
  

    }
}
