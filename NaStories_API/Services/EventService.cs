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
        private readonly IEmailService _emailService;
        private readonly IUnitOfWork _unitOfWork;
        private readonly AppSettings _appSettings;
        private readonly ILogger<EventService> _logger;

        public EventService(IEventRepository eventRepository, IEmailService emailService, ILogger<EventService> logger, IUnitOfWork unitOfWork, IOptions<AppSettings> appSettings)
        {
            _eventRepository = eventRepository;
            _emailService = emailService;
            _logger = logger;
            _unitOfWork = unitOfWork;
            _appSettings = appSettings.Value;
        }

        public async Task<(Guid, ResultCode)> AddEditPrivateTalk(BaseRequest<AddEditPrivateTalkRequest> request, Guid userId)
        {
            return await _eventRepository.AddEditPrivateTalk(request, userId);
        }

        public async Task<(List<EventBookingDate>, ResultCode)> GetEventBookingAvaiableDate()
        {
            return await _eventRepository.GetEventBookingAvaiableDate(_appSettings.BookingAdjustmentDay);
        }
    }
}
