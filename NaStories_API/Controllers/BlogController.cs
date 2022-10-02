using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using NaStories.API.Domain.Entities;
using NaStories.API.Domain.Helpers;
using NaStories.API.Domain.Services;
using NaStories.API.Domain.Services.Communication.Request;
using NaStories.API.Domain.Services.Communication.Response;
using NaStories.API.Infrastructure;
using NaStories.API.Resources;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NaStories_API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BlogController : BaseController
    {
        private readonly IBlogService _blogServices;
        private readonly IHttpClientFactoryService _httpClientFactoryService;
        private readonly ILogger<BlogController> _logger;
        private readonly AppSettings _appSettings;
        private IMapper _mapper;
        public BlogController(
            ILogger<BlogController> logger,
            IMapper mapper,
            IBlogService blogService,
            IHttpClientFactoryService httpClientFactoryService,
            IOptions<AppSettings> appSettings)
        {
            _blogServices = blogService;
            _httpClientFactoryService = httpClientFactoryService;
            _logger = logger;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        [AllowAnonymous]
        [HttpPost("GetCategory")]
        public async Task<BaseResponse<List<CategoryResource>>> GetCategory()
        {
            if (ModelState.IsValid)
            { 
                var categories = await _blogServices.GetCategory();
                if (categories != null)
                {
                    var resources = _mapper.Map<List<Category>, List<CategoryResource>>(categories);
                    return new BaseResponse<List<CategoryResource>>(resources);
                }
                else
                {
                    return new BaseResponse<List<CategoryResource>>(Constants.UnknowMsg, ResultCode.Unknown);
                }
            }
            else
            {
                return new BaseResponse<List<CategoryResource>>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }   
    }
}
