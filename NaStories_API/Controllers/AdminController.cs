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
using NaStories.API.Resources;
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
        private readonly IFileService _fireServices;
        private readonly IHttpClientFactoryService _httpClientFactoryService;
        private readonly ILogger<AdminController> _logger;
        private readonly AppSettings _appSettings;
        private IMapper _mapper;
        public AdminController(
            ILogger<AdminController> logger,
            IMapper mapper,
            IAdminService adminService,
            IFileService fireServices,
            IHttpClientFactoryService httpClientFactoryService,
            IOptions<AppSettings> appSettings)
        {
            _adminServices = adminService;
            _fireServices = fireServices;
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

        [HttpPost("GetEventAvailableDate")]
        public async Task<BaseResponse<List<EventBookingDate>>> GetEventAvailableDate()
        {
            if (ModelState.IsValid)
            {
                return new BaseResponse<List<EventBookingDate>>(await _adminServices.GetEventAvailableDate());
            }
            else
            {
                return new BaseResponse<List<EventBookingDate>>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }


        [HttpPost("AddEditEventAvailableDate")]
        public async Task<BaseResponse<EventBookingDate>> AddEditEventAvailableDate(BaseRequest<AddEventAvailableDateRequest> request)
        {
            if (ModelState.IsValid)
            {
                return new BaseResponse<EventBookingDate>(await _adminServices.AddEditEventAvailableDate(request, GetCurrentUserId()));
            }
            else
            {
                return new BaseResponse<EventBookingDate>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        [HttpPost("RemoveEventAvailableDate")]
        public async Task<BaseResponse<ResultCode>> RemoveEventAvailableDate(BaseRequest<RemoveEventAvailableDateRequest> request)
        {
            if (ModelState.IsValid)
            {
                return new BaseResponse<ResultCode>(await _adminServices.RemoveEventAvailableDate(request, GetCurrentUserId()));
            }
            else
            {
                return new BaseResponse<ResultCode>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        [Permissions(PermissionConstant.GetPrivateTalkList)]

        [HttpPost("GetPrivateTalkList")]
        public async Task<BaseResponse<List<PrivateTalk>>> GetPrivateTalkList(BaseRequest<GetPrivateTalkListFilterRequest> request)
        {
            if (ModelState.IsValid)
            {
                return new BaseResponse<List<PrivateTalk>>(await _adminServices.GetPrivateTalkList(request));
            }
            else
            {
                return new BaseResponse<List<PrivateTalk>>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        [Permissions(PermissionConstant.GetPrivateTalkList)]

        [HttpPost("GetPrivateTalkDetail")]
        public async Task<BaseResponse<PrivateTalk>> GetPrivateTalkDetail(BaseRequest<Guid> request)
        {
            if (ModelState.IsValid)
            {
                return new BaseResponse<PrivateTalk>(await _adminServices.GetPrivateTalkDetail(request.Payload));
            }
            else
            {
                return new BaseResponse<PrivateTalk>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        [Permissions(PermissionConstant.UpdatePrivateTalkStatus)]

        [HttpPost("UpdatePrivateTalkStatus")]
        public async Task<BaseResponse<ResultCode>> UpdatePrivateTalkStatus(BaseRequest<UpdatePrivateTalkStatusRequest> request)
        {
            if (ModelState.IsValid)
            {
                return new BaseResponse<ResultCode>(await _adminServices.UpdatePrivateTalkStatus(request.Payload, GetCurrentUserId()));
            }
            else
            {
                return new BaseResponse<ResultCode>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        [HttpPost("GetPrivateTalkIdByEventBookingDate")]
        public async Task<BaseResponse<Guid>> GetPrivateTalkIdByEventBookingDate(BaseRequest<GetPrivateTalkIdByEventBookingDateRequest> request)
        {
            if (ModelState.IsValid)
            {
                return new BaseResponse<Guid>(await _adminServices.GetPrivateTalkIdByEventBookingDate(request.Payload, GetCurrentUserId()));
            }
            else
            {
                return new BaseResponse<Guid>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        [HttpPost("GetMockInterviewIdByEventBookingDate")]
        public async Task<BaseResponse<Guid>> GetMockInterviewIdByEventBookingDate(BaseRequest<GetMockInterviewIdByEventBookingDateRequest> request)
        {
            if (ModelState.IsValid)
            {
                return new BaseResponse<Guid>(await _adminServices.GetMockInterviewIdByEventBookingDate(request.Payload, GetCurrentUserId()));
            }
            else
            {
                return new BaseResponse<Guid>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }
         
        [Permissions(PermissionConstant.GetMockInterviewList)]

        [HttpPost("GetMockInterviewList")]
        public async Task<BaseResponse<List<MockInterview>>> GetMockInterviewList(BaseRequest<GetMockInterviewListFilterRequest> request)
        {
            if (ModelState.IsValid)
            {
                return new BaseResponse<List<MockInterview>>(await _adminServices.GetMockInterviewList(request));
            }
            else
            {
                return new BaseResponse<List<MockInterview>>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        [Permissions(PermissionConstant.GetMockInterviewList)]

        [HttpPost("GetMockInterviewDetail")]
        public async Task<BaseResponse<MockInterview>> GetMockInterviewDetail(BaseRequest<Guid> request)
        {
            if (ModelState.IsValid)
            {
                return new BaseResponse<MockInterview>(await _adminServices.GetMockInterviewDetail(request.Payload));
            }
            else
            {
                return new BaseResponse<MockInterview>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        [Permissions(PermissionConstant.UpdateMockInterviewStatus)]

        [HttpPost("UpdateMockInterviewStatus")]
        public async Task<BaseResponse<ResultCode>> UpdateMockInterviewStatus(BaseRequest<UpdateMockInterviewStatusRequest> request)
        {
            if (ModelState.IsValid)
            {
                return new BaseResponse<ResultCode>(await _adminServices.UpdateMockInterviewStatus(request.Payload, GetCurrentUserId()));
            }
            else
            {
                return new BaseResponse<ResultCode>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        [Permissions(PermissionConstant.UpdatePrivateTalkStatus)]

        [HttpPost("CancelPrivateTalk")]
        public async Task<BaseResponse<ResultCode>> CancelPrivateTalk(BaseRequest<CancelEventRequest> request)
        {
            if (ModelState.IsValid)
            {
                return new BaseResponse<ResultCode>(await _adminServices.CancelPrivateTalk(request.Payload.Id, GetCurrentUserId()));
            }
            else
            {
                return new BaseResponse<ResultCode>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        [Permissions(PermissionConstant.UpdateMockInterviewStatus)]

        [HttpPost("CancelMockInterview")]
        public async Task<BaseResponse<ResultCode>> CancelMockInterview(BaseRequest<CancelEventRequest> request)
        {
            if (ModelState.IsValid)
            {
                return new BaseResponse<ResultCode>(await _adminServices.CancelMockInterview(request.Payload.Id, GetCurrentUserId()));
            }
            else
            {
                return new BaseResponse<ResultCode>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        [Permissions(PermissionConstant.UpdateMockInterviewStatus)] 
        [HttpPost("DeleteReasonChangeMockInterview")]
        public async Task<BaseResponse<ResultCode>> DeleteReasonChangeMockInterview(BaseRequest<RequestId> request)
        {
            if (ModelState.IsValid)
            {
                return new BaseResponse<ResultCode>(await _adminServices.DeleteReasonChangeMockInterview(request.Payload.Id, GetCurrentUserId()));
            }
            else
            {
                return new BaseResponse<ResultCode>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        [Permissions(PermissionConstant.UpdatePrivateTalkStatus)]
        [HttpPost("DeleteReasonChangePrivateTalk")]
        public async Task<BaseResponse<ResultCode>> DeleteReasonChangePrivateTalk(BaseRequest<RequestId> request)
        {
            if (ModelState.IsValid)
            {
                return new BaseResponse<ResultCode>(await _adminServices.DeleteReasonChangePrivateTalk(request.Payload.Id, GetCurrentUserId()));
            }
            else
            {
                return new BaseResponse<ResultCode>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }
         

        [Permissions(PermissionConstant.ManageUser)]

        [HttpPost("GetUserList")]
        public async Task<BaseResponse<List<UserListResource>>> GetUserList()
        {
            if (ModelState.IsValid)
            {
                var (data, resultCode) = await _adminServices.GetUserList();
                if (data != null)
                {
                    return new BaseResponse<List<UserListResource>>(_mapper.Map<List<User>, List<UserListResource>>(data));
                }
                else
                {
                    return new BaseResponse<List<UserListResource>>(Constants.ErrorMsg, resultCode);
                }
            }
            else
            {
                return new BaseResponse<List<UserListResource>>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }


        [Permissions(PermissionConstant.ManageFileSharing)]
        [HttpPost("AddUpdateFileSharing")]
        public async Task<BaseResponse<(FileSharing, ResultCode)>> AddUpdateFileSharing(BaseRequest<AddUpdateFileSharingRequest> request)
        {

            if (ModelState.IsValid)
            {
                return new BaseResponse<(FileSharing, ResultCode)>(await _fireServices.AddUpdateFileSharing(request, GetCurrentUserId()));
            }
            else
            {
                return new BaseResponse<(FileSharing, ResultCode)>(Constants.InvalidMsg, ResultCode.Invalid);
            } 
        }

        [Permissions(PermissionConstant.ManageFileSharing)]
        [HttpPost("GetFileSharing")]
        public async Task<BaseResponse<List<FileSharing>>> GetFileSharing(BaseRequest<FileSharingSearchRequest> request)
        {
            if (ModelState.IsValid)
            {
                var (data, resultCode) = await _fireServices.GetAdminFileSharing(request, GetCurrentUserId());
                return new BaseResponse<List<FileSharing>>(data);
            }
            else
            {
                return new BaseResponse<List<FileSharing>>(Constants.InvalidMsg, ResultCode.Invalid);
            }

        }

        [Permissions(PermissionConstant.ManageFileSharing)]
        [HttpPost("RemoveFileSharing")]
        public async Task<BaseResponse<ResultCode>> RemoveFileSharing(BaseRequest<RequestId> request)
        {

            if (ModelState.IsValid)
            {
                return new BaseResponse<ResultCode>(await _fireServices.RemoveFileSharing(request, GetCurrentUserId()));
            }
            else
            {
                return new BaseResponse<ResultCode>(Constants.InvalidMsg, ResultCode.Invalid);
            }

        }

        [Permissions(PermissionConstant.ManageUser)]

        [HttpPost("GetFeedbackList")]
        public async Task<BaseResponse<List<FeedbackListResource>>> GetFeedbackList(BaseRequest<GetFeedbackRequest> request)
        {
            if (ModelState.IsValid)
            {
                var (data, resultCode) = await _adminServices.GetFeedbackList(request);
                if (data != null)
                {
                    return new BaseResponse<List<FeedbackListResource>>(_mapper.Map<List<Feedback>, List<FeedbackListResource>>(data));
                }
                else
                {
                    return new BaseResponse<List<FeedbackListResource>>(Constants.ErrorMsg, resultCode);
                }
            }
            else
            {
                return new BaseResponse<List<FeedbackListResource>>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }


    }
}
