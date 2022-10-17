using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using NaStories.API.Domain.Entities;
using NaStories.API.Domain.Helpers;
using NaStories.API.Domain.Services;
using NaStories.API.Domain.Services.Communication.Response;
using NaStories.API.Infrastructure;
using NaStories.API.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NaStories.API.Controllers
{
    [AllowAnonymous]
    [Route("[controller]")]
    [ApiController]
    public class HomeController : BaseController
    {
        private readonly IHomeService _homeServices;
        private readonly ILogger<HomeController> _logger;
        private readonly AppSettings _appSettings;
        private IMapper _mapper;
        public HomeController(
            IHomeService homeServices,
            ILogger<HomeController> logger,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _homeServices = homeServices;
            _logger = logger;
            _mapper = mapper;
            _appSettings = appSettings.Value;

        }

        [HttpGet("getYoutubevideos")]
        public async Task<BaseResponse<List<YoutubeVideoResource>>> GetYoutubevideos()
        {
             
            var (data, resultCode) = await _homeServices.GetYoutubeVideos();
            if (data != null)
            {
                return new BaseResponse<List<YoutubeVideoResource>>(_mapper.Map<List<YoutubeVideo>, List<YoutubeVideoResource>>(data));
            }
            else
            {
                return new BaseResponse<List<YoutubeVideoResource>>(Constants.ErrorMsg, resultCode);
            }
             
        }


    }
}