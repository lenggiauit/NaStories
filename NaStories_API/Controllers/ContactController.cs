using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using NaStories.API.Domain.Helpers;
using NaStories.API.Domain.Services;
using NaStories.API.Domain.Services.Communication.Request;
using NaStories.API.Domain.Services.Communication.Response;
using System.Threading.Tasks;

namespace NaStories.API.Controllers
{
    [Route("[controller]")]  
    public class ContactController : ControllerBase
    { 
        private readonly IEmailService _emailService;
        private readonly ILogger<ContactController> _logger;
        private readonly AppSettings _appSettings;
        private IMapper _mapper;
        public ContactController(ILogger<ContactController> logger, 
            IEmailService emailService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _logger = logger; 
            _emailService = emailService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        [AllowAnonymous]
        [HttpPost("SendContact")]
        public Task<BaseResponse<ResultCode>> SendContact([FromBody] BaseRequest<ContactRequest> request)
        {
            if (ModelState.IsValid)
            { 
                _emailService.Send(request.Payload.YourEmail,
                    _appSettings.MailDefaultSubject,
                    string.Format(_appSettings.MailDefaultContent, request.Payload.YourName));
                // send to domain email
                _emailService.Send(_appSettings.MailSender,
                   request.Payload.YourName,
                     request.Payload.YourMessage);

                return Task.FromResult(new BaseResponse<ResultCode>(resultCode:  ResultCode.Success));
            }
            else
            {
                return Task.FromResult(new BaseResponse<ResultCode>(Constants.InvalidMsg, ResultCode.Invalid));
            }

        }
    }
}
