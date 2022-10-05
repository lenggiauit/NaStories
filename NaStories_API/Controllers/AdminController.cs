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
using NaStories.API.Domain.Services.Communication.Request.Admin;
using NaStories.API.Domain.Services.Communication.Response;
using NaStories.API.Infrastructure;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BlogPostFilterRequest = NaStories.API.Domain.Services.Communication.Request.Admin.BlogPostFilterRequest;

namespace NaStories.API.Controllers
{
    [Authorize]
    [Route("[controller]")]
    [ApiController]
    public class AdminController : BaseController
    {
        private readonly IAdminService _adminServices;
        private readonly IHttpClientFactoryService _httpClientFactoryService;
        private readonly ILogger<AdminController> _logger;
        private readonly AppSettings _appSettings;
        private IMapper _mapper;
        public AdminController(
            ILogger<AdminController> logger,
            IMapper mapper,
            IAdminService adminService,
            IHttpClientFactoryService httpClientFactoryService,
            IOptions<AppSettings> appSettings)
        {
            _adminServices = adminService;
            _httpClientFactoryService = httpClientFactoryService;
            _logger = logger;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        [HttpPost("GetCategory")]
        public async Task<BaseResponse<List<Category>>> GetCategory(BaseRequest<CategoryFilterRequest> request)
        {
            if (ModelState.IsValid)
            {
                return new BaseResponse<List<Category>>(await _adminServices.GetCategory(request));
            }
            else
            {
                return new BaseResponse<List<Category>>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        [HttpGet("CheckCategoryName")]
        public async Task<BaseResponse<ResultCode>> CheckCategoryName(string name, Guid? categoryid)
        {
            if (!string.IsNullOrEmpty(name))
            {
                var result = await _adminServices.CheckCategoryName(name, categoryid);
                return new BaseResponse<ResultCode>(result);
            }
            else
            {
                return new BaseResponse<ResultCode>(ResultCode.Invalid);
            }
        }

        [Permissions(PermissionConstant.CreateEditCategory)]
        [HttpPost("CreateEditCategory")]
        public async Task<BaseResponse<Category>> CreateEditCategory(BaseRequest<CreateEditCategoryRequest> request)
        {
            if (ModelState.IsValid)
            {
                return new BaseResponse<Category>(await _adminServices.CreateEditCategory(request, GetCurrentUserId()));
            }
            else
            {
                return new BaseResponse<Category>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        [HttpPost("GetBlogPost")]
        public async Task<BaseResponse<List<BlogPost>>> GetBlogPost(BaseRequest<BlogPostFilterRequest> request)
        {
            if (ModelState.IsValid)
            {
                return new BaseResponse<List<BlogPost>>(await _adminServices.GetBlogPost(request));
            }
            else
            {
                return new BaseResponse<List<BlogPost>>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        [HttpGet("CheckBlogPostTitle")]
        public async Task<BaseResponse<ResultCode>> CheckBlogPostTitle(string title, Guid? blogPostId)
        {
            if (!string.IsNullOrEmpty(title))
            {
                var result = await _adminServices.CheckBlogPostTitle(title, blogPostId);
                return new BaseResponse<ResultCode>(result);
            }
            else
            {
                return new BaseResponse<ResultCode>(ResultCode.Invalid);
            }
        }

        [Permissions(PermissionConstant.CreateEditBlogPost)]
        [HttpPost("CreateEditBlogPost")]
        public async Task<BaseResponse<BlogPost>> CreateEditBlogPost(BaseRequest<CreateEditBlogPostRequest> request)
        {
            if (ModelState.IsValid)
            {
                return new BaseResponse<BlogPost>(await _adminServices.CreateEditBlogPost(request, GetCurrentUserId()));
            }
            else
            {
                return new BaseResponse<BlogPost>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        [Permissions(PermissionConstant.CreateEditBlogPost)]
        [HttpPost("UpdateBlogPostStatus")]
        public async Task<BaseResponse<ResultCode>> UpdateBlogPostStatus(BaseRequest<UpdateBlogPostStatusRequest> request)
        {
            if (ModelState.IsValid)
            {
                return new BaseResponse<ResultCode>(await _adminServices.UpdateBlogPostStatus(request, GetCurrentUserId()));
            }
            else
            {
                return new BaseResponse<ResultCode>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }


    }
}
