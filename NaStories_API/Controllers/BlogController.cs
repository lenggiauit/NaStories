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
    [AllowAnonymous]
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

        
        [HttpGet("GetCategory")]
        public async Task<BaseResponse<List<CategoryResource>>> GetCategory()
        {
            if (ModelState.IsValid)
            {
                var (data, resultCode) = await _blogServices.GetCategory();
                if (data != null)
                {
                    return new BaseResponse<List<CategoryResource>>(_mapper.Map<List<Category>, List<CategoryResource>>(data));
                }
                else
                {
                    return new BaseResponse<List<CategoryResource>>(Constants.ErrorMsg, resultCode);
                }
            }
            else
            {
                return new BaseResponse<List<CategoryResource>>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        [HttpGet("GetTags")]
        public async Task<BaseResponse<List<TagResource>>> GetTags()
        {
            if (ModelState.IsValid)
            {
                var (data, resultCode) = await _blogServices.GetTags();
                if (data != null)
                {
                    return new BaseResponse<List<TagResource>>(_mapper.Map<List<Tag>, List<TagResource>>(data));
                }
                else
                {
                    return new BaseResponse<List<TagResource>>(Constants.ErrorMsg, resultCode);
                }
            }
            else
            {
                return new BaseResponse<List<TagResource>>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        [HttpGet("GetTopPost")]
        public async Task<BaseResponse<List<BlogPostResource>>> GetTopPost()
        {
            if (ModelState.IsValid)
            {
                var (data, resultCode) = await _blogServices.GetTopPost();
                if (data != null)
                {
                    return new BaseResponse<List<BlogPostResource>>(_mapper.Map<List<BlogPost>, List<BlogPostResource>>(data));
                }
                else
                {
                    return new BaseResponse<List<BlogPostResource>>(Constants.ErrorMsg, resultCode);
                }
            }
            else
            {
                return new BaseResponse<List<BlogPostResource>>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        [HttpPost("GetBlogPost")]
        public async Task<BaseResponse<List<BlogPostResource>>> GetBlogPost(BaseRequest<BlogPostSearchRequest> request)
        {
            if (ModelState.IsValid)
            {
                var (data, resultCode) = await _blogServices.GetPosts(request);
                if (data != null)
                {
                    return new BaseResponse<List<BlogPostResource>>(_mapper.Map<List<BlogPost>, List<BlogPostResource>>(data));
                }
                else
                {
                    return new BaseResponse<List<BlogPostResource>>(Constants.ErrorMsg, resultCode);
                }
            }
            else
            {
                return new BaseResponse<List<BlogPostResource>>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        [HttpGet("GetBlogPostDetail")]
        public async Task<BaseResponse<BlogPostResource>> GetBlogPostDetail(string postUrl)
        {
            if (!string.IsNullOrEmpty(postUrl))
            {
                var (data, resultCode) = await _blogServices.GetBlogPostDetail(postUrl);
                if (data != null)
                {
                    return new BaseResponse<BlogPostResource>(_mapper.Map<BlogPost, BlogPostResource>(data));
                }
                else
                {
                    return new BaseResponse<BlogPostResource>(Constants.ErrorMsg, resultCode);
                }
            }
            else
            {
                return new BaseResponse<BlogPostResource>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        [HttpGet("GetRelatedPost")]
        public async Task<BaseResponse<List<BlogPostResource>>> GetRelatedPost(string category, string notIn)
        {
            if (!string.IsNullOrEmpty(category))
            {
                var (data, resultCode) = await _blogServices.GetRelatedPost(category, notIn);
                if (data != null)
                {
                    return new BaseResponse<List<BlogPostResource>>(_mapper.Map< List<BlogPost>, List<BlogPostResource>>(data));
                }
                else
                {
                    return new BaseResponse<List<BlogPostResource>>(Constants.ErrorMsg, resultCode);
                }
            }
            else
            {
                return new BaseResponse<List<BlogPostResource>>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        





    }
}
