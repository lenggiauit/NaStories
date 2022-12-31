using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using NaStories.API.Domain.Entities;
using NaStories.API.Domain.Helpers;
using NaStories.API.Domain.Repositories;
using NaStories.API.Domain.Services;
using NaStories.API.Domain.Services.Communication.Request;
using NaStories.API.Extensions;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NaStories.API.Services
{
    public class EventService : IEventService
    {
        private readonly IEventRepository _eventRepository;
        private readonly INotificationRepository _notifyRepository;
        private readonly IEmailService _emailService;
        private readonly IUnitOfWork _unitOfWork;
        private readonly AppSettings _appSettings;
        private readonly ILogger<EventService> _logger;

        public EventService(IEventRepository eventRepository, INotificationRepository notificationRepository, IEmailService emailService, ILogger<EventService> logger, IUnitOfWork unitOfWork, IOptions<AppSettings> appSettings)
        {
            _eventRepository = eventRepository;
            _notifyRepository = notificationRepository;
            _emailService = emailService;
            _logger = logger;
            _unitOfWork = unitOfWork;
            _appSettings = appSettings.Value;

        }

        public async Task<(Guid, ResultCode)> AddEditMockInterview(BaseRequest<AddEditMockInterviewRequest> request, Guid userId, string userName)
        {
            var (data, result) = await _eventRepository.AddEditMockInterview(request, userId);
            if (result == ResultCode.Success && (request.Payload.Id == null || request.Payload.Id != Guid.Empty))
            {
                string smtpPwd = EncryptionHelper.Decrypt(_appSettings.SmtpPass, Constants.PassDecryptKey);

                await _emailService.Send(_appSettings.MailAdmin,
                     "Register MockInterview Success", string.Format( "User Email: {0}", userName), smtpPwd);

                await _notifyRepository.SendNotification("[RegisterMockInterviewSuccess]", userId);
            }
            else
            {
                await _notifyRepository.SendNotification("[UpdateMockInterviewSuccess]", userId);
            }
            return (data, result);
        }

        public async Task<(Guid, ResultCode)> AddEditPrivateTalk(BaseRequest<AddEditPrivateTalkRequest> request, Guid userId, string userName)
        {
            var (data, result ) = await _eventRepository.AddEditPrivateTalk(request, userId);
            if(result == ResultCode.Success && (request.Payload.Id == null || request.Payload.Id != Guid.Empty))
            {
                string smtpPwd = EncryptionHelper.Decrypt(_appSettings.SmtpPass, Constants.PassDecryptKey);
                await _emailService.Send(_appSettings.MailAdmin,
                    "Register Private Talk Success", string.Format("User Email: {0}", userName), smtpPwd);
                await _notifyRepository.SendNotification("[RegisterPrivateTalkSuccess]", userId);
            }
            else
            {
                await _notifyRepository.SendNotification("[UpdatePrivateTalkSuccess]", userId);
            }
            return (data, result);
        }

        public async Task<(List<EventBookingDate>, ResultCode)> GetEventBookingAvaiableDate()
        {
            return await _eventRepository.GetEventBookingAvaiableDate(_appSettings.BookingAdjustmentDay);
        }

        public async Task<(List<MockInterview>, ResultCode)> GetMockInterviewList(Guid userId)
        { 
            var (data, result) = await _eventRepository.GetMockInterviewList(userId);
            if (result == ResultCode.Success)
            {
                foreach (var item in data)
                {
                    item.EventStatus = ((MockInterviewStatusEnum)Enum.Parse(typeof(MockInterviewStatusEnum), item.EventStatus)).ToDescriptionString();
                }
            }
            return (data, result);
        }

        public async Task<(List<PrivateTalk>, ResultCode)> GetPrivateTalkList(Guid userId)
        {
            var (data, result) = await _eventRepository.GetPrivateTalkList(userId);
            if (result == ResultCode.Success)
            {
                foreach (var item in data)
                {
                    item.EventStatus = ((PrivateTalkStatusEnum)Enum.Parse(typeof(PrivateTalkStatusEnum), item.EventStatus)).ToDescriptionString(); 
                }
            } 

            return (data, result);
        }

        public async Task<ResultCode> RemoveMockInterview(Guid id, string reason, Guid userId, string userName)
        {
            var result = await _eventRepository.RemoveMockInterview(id, reason, userId);
            if (result == ResultCode.Success)
            {
                await _notifyRepository.SendNotification("[RemoveMockInterviewSuccess]", userId);

                string smtpPwd = EncryptionHelper.Decrypt(_appSettings.SmtpPass, Constants.PassDecryptKey);
                await _emailService.Send(_appSettings.MailAdmin,
                    "Hủy Mock Interview ", string.Format("User Email: {0}", userName), smtpPwd);
            }

            return result;
        }

        public async Task<ResultCode> RemovePrivateTalk(Guid id, string reason, Guid userId, string userName)
        {
            var result = await _eventRepository.RemovePrivateTalk(id, reason, userId);
            if (result == ResultCode.Success)
            {
                await _notifyRepository.SendNotification("[RemovePrivateTalkSuccess]", userId);

                string smtpPwd = EncryptionHelper.Decrypt(_appSettings.SmtpPass, Constants.PassDecryptKey);
                await _emailService.Send(_appSettings.MailAdmin,
                    "Hủy Mock Interview ", string.Format("User Email: {0}", userName), smtpPwd);
            }
             
            return result;

        }

        public async Task<ResultCode> RequestChangeMockInterview(BaseRequest<RequestChangeEventRequest> request, Guid userId, string userName)
        {
            var result = await _eventRepository.RequestChangeMockInterview(request, userId);
            if (result == ResultCode.Success)
            {
                await _notifyRepository.SendNotification("[RequestMockInterviewSuccess]", userId);

                string smtpPwd = EncryptionHelper.Decrypt(_appSettings.SmtpPass, Constants.PassDecryptKey);
                await _emailService.Send(_appSettings.MailAdmin,
                    "Yêu cầu đổi ngày Mock Interview ", string.Format("User Email: {0}", userName), smtpPwd);
            }

            return result;
        }

        public async Task<ResultCode> RequestChangePrivateTalk(BaseRequest<RequestChangeEventRequest> request, Guid userId, string userName)
        {
            var result = await _eventRepository.RequestChangePrivateTalk(request, userId);
            if (result == ResultCode.Success)
            {
                await _notifyRepository.SendNotification("[RequestChangePrivateTalkSuccess]", userId);

                string smtpPwd = EncryptionHelper.Decrypt(_appSettings.SmtpPass, Constants.PassDecryptKey);
                await _emailService.Send(_appSettings.MailAdmin,
                    "Yêu cầu đổi ngày Private Talk ", string.Format("User Email: {0}", userName), smtpPwd);
            }

            return result;
        }
    }
}
