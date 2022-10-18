using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using NaStories.API.Domain.Entities;
using NaStories.API.Domain.Helpers;
using NaStories.API.Domain.Repositories;
using NaStories.API.Domain.Services;
using NaStories.API.Domain.Services.Communication.Request;
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

        public async Task<(Guid, ResultCode)> AddEditPrivateTalk(BaseRequest<AddEditPrivateTalkRequest> request, Guid userId)
        {
            var (data, result ) = await _eventRepository.AddEditPrivateTalk(request, userId);
            if(result == ResultCode.Success && (request.Payload.Id == null || request.Payload.Id != Guid.Empty))
            {
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

        public async Task<(List<PrivateTalk>, ResultCode)> GetPrivateTalkList(Guid userId)
        {
            return await _eventRepository.GetPrivateTalkList(userId);
        }

        public async Task<ResultCode> RemovePrivateTalk(Guid id, string reason, Guid userId)
        {
            var result = await _eventRepository.RemovePrivateTalk(id, reason, userId);
            if (result == ResultCode.Success)
            {
                await _notifyRepository.SendNotification("[RemovePrivateTalkSuccess]", userId);
            }
             
            return result;

        }

        public async Task<ResultCode> RequestChangePrivateTalk(BaseRequest<RequestChangePrivateTalkRequest> request, Guid userId)
        {
            var result = await _eventRepository.RequestChangePrivateTalk(request, userId);
            if (result == ResultCode.Success)
            {
                await _notifyRepository.SendNotification("[RequestChangePrivateTalkSuccess]", userId);
            }

            return result;
        }
    }
}
