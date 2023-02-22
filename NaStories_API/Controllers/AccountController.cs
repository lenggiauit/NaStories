using AutoMapper;
using Microsoft.AspNetCore.Authorization;
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
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace NaStories.API.Controllers
{
    [Authorize]
    [Route("[controller]")]
    public class AccountController : BaseController
    {
        private readonly IAccountService _accountServices;
        private readonly IEventService _eventServices;
        private readonly IHttpClientFactoryService _httpClientFactoryService;
        private readonly ILogger<AccountController> _logger;
        private readonly AppSettings _appSettings;
        private IMapper _mapper;
        public AccountController(
            ILogger<AccountController> logger,
            IMapper mapper,
            IAccountService accountService,
            IEventService eventService,
            IHttpClientFactoryService httpClientFactoryService,
            IOptions<AppSettings> appSettings)
        {
            _accountServices = accountService;
            _eventServices = eventService;
            _httpClientFactoryService = httpClientFactoryService;
            _logger = logger;
            _mapper = mapper;
            _appSettings = appSettings.Value; 
        }

        [AllowAnonymous]
        [HttpPost("Login")]
        public async Task<BaseResponse<UserResource>> Login([FromBody] BaseRequest<AuthenticateRequest> request)
        {
            if (ModelState.IsValid)
            {
                var user = await _accountServices.Login( request.Payload.Name, request.Payload.Password );
                if (user != null)
                {
                    var resources = _mapper.Map<User, UserResource>(user);
                    AccessToken accessToken = new AccessToken(); 
                    resources.AccessToken = accessToken.GenerateToken(user, _appSettings.Secret); 
                    return new BaseResponse<UserResource>(resources);
                }
                else
                {
                    return new BaseResponse<UserResource>(Constants.InvalidMsg, ResultCode.NotExistUser);
                }
            }
            else
            {
                return new BaseResponse<UserResource>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        [AllowAnonymous]
        [HttpGet("LoginWithGoogle")]
        public async Task<BaseResponse<UserResource>> LoginWithGoogle(string access_token)
        {
            try
            {
                var googleApiResponse = _httpClientFactoryService.GetAsync(string.Format(_appSettings.GoogleapisUrl, access_token)).Result;
                if (googleApiResponse != null)
                {
                    var user = await _accountServices.LoginWithGoogle(googleApiResponse["email"].ToString());
                    if (user != null)
                    {
                        var resources = _mapper.Map<User, UserResource>(user);
                        AccessToken accessToken = new AccessToken(); 
                        resources.AccessToken = accessToken.GenerateToken(user, _appSettings.Secret); 
                        return new BaseResponse<UserResource>(resources);
                    }
                    else
                    {
                        return new BaseResponse<UserResource>(Constants.UnknowMsg, ResultCode.NotExistEmail);
                    }
                }
                else
                {
                    return new BaseResponse<UserResource>(Constants.InvalidMsg, ResultCode.Unknown);
                }
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return new BaseResponse<UserResource>(Constants.InvalidMsg, ResultCode.Error);
            }
        }

        [AllowAnonymous]
        [HttpPost("Register")]
        public async Task<BaseResponse<ResultCode>> Register([FromBody] BaseRequest<RegisterRequest> request)
        {
            if (ModelState.IsValid)
            {
                var result = await _accountServices.Register(request.Payload.UserName, request.Payload.Email, request.Payload.Password);
                return new BaseResponse<ResultCode>(string.Empty, result);
            }
            else
            {
                return new BaseResponse<ResultCode>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        [AllowAnonymous]
        [HttpGet("RegisterWithGoogle")]
        public async Task<BaseResponse<ResultCode>> RegisterWithGoogle(string access_token)
        {  
            try
            {
               var googleApiResponse = _httpClientFactoryService.GetAsync(string.Format(_appSettings.GoogleapisUrl, access_token)).Result;
               if(googleApiResponse != null)
                {
                    var result = await _accountServices.Register(
                        googleApiResponse["email"].ToString(), 
                        googleApiResponse["email"].ToString(), 
                        string.Empty,
                        googleApiResponse["name"].ToString(),
                        googleApiResponse["picture"].ToString()
                        );
                    return new BaseResponse<ResultCode>(string.Empty, result); 
                }
                else
                {
                    return new BaseResponse<ResultCode>(Constants.InvalidMsg, ResultCode.Unknown);
                } 
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return new BaseResponse<ResultCode>(Constants.InvalidMsg, ResultCode.Error);
            }
        }

        [AllowAnonymous]
        [HttpGet("CheckEmail")]
        public async Task<BaseResponse<ResultCode>> CheckEmail(string email)
        { 
            var result = await _accountServices.CheckEmail(email);
            return new BaseResponse<ResultCode>(string.Empty, result); 
        }

        [AllowAnonymous]
        [HttpGet("CheckEmailWithUser")]
        public async Task<BaseResponse<ResultCode>> CheckEmailWithUser(string email, Guid Id)
        {
            var result = await _accountServices.CheckEmailWithUser(email, Id);
            return new BaseResponse<ResultCode>(string.Empty, result);
        }

        [AllowAnonymous]
        [HttpGet("CheckUserName")]
        public async Task<BaseResponse<ResultCode>> CheckUserName(string name)
        {
            var result = await _accountServices.CheckUserName(name);
            return new BaseResponse<ResultCode>(string.Empty, result);
        }

        [AllowAnonymous]
        [HttpPost("ForgotPassword")]
        public async Task<BaseResponse<ResultCode>> ForgotPassword([FromBody] BaseRequest<ForgotPasswordRequest> request)
        {
            if (ModelState.IsValid)
            {
                var result = await _accountServices.ForgotPassword(request.Payload.Email);
                return new BaseResponse<ResultCode>(string.Empty, result);
            }
            else
            {
                return new BaseResponse<ResultCode>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        [HttpPost("ResetPassword")]
        public async Task<BaseResponse<ResultCode>> ResetPassword([FromBody] BaseRequest<ResetPasswordRequest> request)
        {
            if (ModelState.IsValid)
            {
                var result = await _accountServices.ResetPassword(request.Payload.UserInfo, request.Payload.NewPassword);
                return new BaseResponse<ResultCode>(string.Empty, result);
            }
            else
            {
                return new BaseResponse<ResultCode>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        [HttpPost("UpdateProfile")]
        public async Task<BaseResponse<ResultCode>> UpdateProfile([FromBody] BaseRequest<UpdateProfileRequest> request)
        {
            if (ModelState.IsValid)
            {
                var result = await _accountServices.UpdateProfile(GetCurrentUserId(), request);
                return new BaseResponse<ResultCode>(string.Empty, result); 
            }
            else
            {
                return new BaseResponse<ResultCode>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }
        
        [HttpPost("UpdateUserAvatar")]
        public async Task<BaseResponse<ResultCode>> UpdateUserAvatar([FromBody] BaseRequest<UpdateUserAvatarRequest> request)
        {
            if (ModelState.IsValid)
            {
                var result = await _accountServices.UpdateUserAvatar(GetCurrentUserId(), request);
                return new BaseResponse<ResultCode>(result);
            }
            else
            {
                return new BaseResponse<ResultCode>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        [HttpPost("GetPrivateTalkList")]
        public async Task<BaseResponse<List<PrivateTalkResource>>> GetPrivateTalkList()
        {
            if (ModelState.IsValid)
            {
                var (data, resultCode) = await _eventServices.GetPrivateTalkList(GetCurrentUserId());
                if (data != null)
                {
                    return new BaseResponse<List<PrivateTalkResource>>(_mapper.Map<List<PrivateTalk>, List<PrivateTalkResource>>(data));
                }
                else
                {
                    return new BaseResponse<List<PrivateTalkResource>>(Constants.ErrorMsg, resultCode);
                }

            }
            else
            {
                return new BaseResponse<List<PrivateTalkResource>>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        [HttpPost("RemovePrivateTalk")]
        public async Task<BaseResponse<ResultCode>> RemovePrivateTalk([FromBody] BaseRequest<RemoveEventRequest> request)
        {
            if (ModelState.IsValid)
            {
                return new BaseResponse<ResultCode>(await _eventServices.RemovePrivateTalk(request.Payload.Id, request.Payload.Reason, GetCurrentUserId(), GetCurrentUser().Email ));
            }
            else
            {
                return new BaseResponse<ResultCode>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        [HttpPost("RequestChangePrivateTalk")]
        public async Task<BaseResponse<ResultCode>> RequestChangePrivateTalk([FromBody] BaseRequest<RequestChangeEventRequest> request)
        {
            if (ModelState.IsValid)
            {
                return new BaseResponse<ResultCode>(await _eventServices.RequestChangePrivateTalk(request, GetCurrentUserId(), GetCurrentUser().Email));
            }
            else
            {
                return new BaseResponse<ResultCode>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        [HttpPost("GetMockInterviewList")]
        public async Task<BaseResponse<List<MockInterviewResource>>> GetMockInterviewList()
        {
            if (ModelState.IsValid)
            {
                var (data, resultCode) = await _eventServices.GetMockInterviewList(GetCurrentUserId());
                if (data != null)
                {
                    return new BaseResponse<List<MockInterviewResource>>(_mapper.Map<List<MockInterview>, List<MockInterviewResource>>(data));
                }
                else
                {
                    return new BaseResponse<List<MockInterviewResource>>(Constants.ErrorMsg, resultCode);
                }

            }
            else
            {
                return new BaseResponse<List<MockInterviewResource>>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        [HttpPost("RemoveMockInterview")]
        public async Task<BaseResponse<ResultCode>> RemoveMockInterview([FromBody] BaseRequest<RemoveEventRequest> request)
        {
            if (ModelState.IsValid)
            {
                return new BaseResponse<ResultCode>(await _eventServices.RemoveMockInterview(request.Payload.Id, request.Payload.Reason, GetCurrentUserId(), GetCurrentUser().Email));
            }
            else
            {
                return new BaseResponse<ResultCode>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        [HttpPost("RequestChangeMockInterview")]
        public async Task<BaseResponse<ResultCode>> RequestChangeMockInterview([FromBody] BaseRequest<RequestChangeEventRequest> request)
        {
            if (ModelState.IsValid)
            {
                return new BaseResponse<ResultCode>(await _eventServices.RequestChangeMockInterview(request, GetCurrentUserId(), GetCurrentUser().Email));
            }
            else
            {
                return new BaseResponse<ResultCode>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }
         
        [HttpPost("SendFeedback")]
        public async Task<BaseResponse<ResultCode>> SendFeedback([FromBody] BaseRequest<FeedbackRequest> request)
        {
            if (ModelState.IsValid)
            {
                return new BaseResponse<ResultCode>(await _accountServices.SendFeedback(request, GetCurrentUserId()));
            }
            else
            {
                return new BaseResponse<ResultCode>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }






    }
}
