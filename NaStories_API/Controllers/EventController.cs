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
using System.Threading.Tasks;

namespace NaStories.API.Controllers
{
    [AllowAnonymous]
    [Route("[controller]")]
    [ApiController]
    public class EventController : BaseController
    {
        private readonly IEventService _eventService;
        private readonly IHttpClientFactoryService _httpClientFactoryService;
        private readonly ILogger<EventController> _logger;
        private readonly AppSettings _appSettings;
        private IMapper _mapper;
        public EventController(
            ILogger<EventController> logger,
            IMapper mapper,
            IEventService eventService,
            IHttpClientFactoryService httpClientFactoryService,
            IOptions<AppSettings> appSettings)
        {
            _eventService = eventService;
            _httpClientFactoryService = httpClientFactoryService;
            _logger = logger;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        [HttpPost("GetEventBookingAvaiableDate")]
        public async Task<BaseResponse<List<EventBookingDateResource>>> GetEventBookingAvaiableDate()
        {
            if (ModelState.IsValid)
            {
                var (data, resultCode) = await _eventService.GetEventBookingAvaiableDate();
                if (data != null)
                {
                    return new BaseResponse<List<EventBookingDateResource>>(_mapper.Map<List<EventBookingDate>, List<EventBookingDateResource>>(data));
                }
                else
                {
                    return new BaseResponse<List<EventBookingDateResource>>(Constants.ErrorMsg, resultCode);
                }
                 
            }
            else
            {
                return new BaseResponse<List<EventBookingDateResource>>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        [HttpPost("AddEditPrivateTalk")]
        public async Task<BaseResponse<Guid>> AddEditPrivateTalk(BaseRequest<AddEditPrivateTalkRequest> request)
        {
            if (ModelState.IsValid)
            {
                return new BaseResponse<Guid>(await _eventService.AddEditPrivateTalk(request, GetCurrentUserId()));
            }
            else
            {
                return new BaseResponse<Guid>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }


    }
}
