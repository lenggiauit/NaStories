using NaStories.API.Domain.Entities;
using NaStories.API.Domain.Helpers;
using NaStories.API.Domain.Services.Communication.Request;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NaStories.API.Domain.Services
{
    public interface IEventService
    {
        Task<(List<EventBookingDate>, ResultCode)> GetEventBookingAvaiableDate();
        Task<(Guid, ResultCode)> AddEditPrivateTalk(BaseRequest<AddEditPrivateTalkRequest> request, Guid userId, string userName);
        Task<ResultCode> RemovePrivateTalk(Guid id, string reason, Guid userId, string userName);
        Task<ResultCode> RequestChangePrivateTalk(BaseRequest<RequestChangeEventRequest> request, Guid userId, string userName);
        Task<(List<PrivateTalk>, ResultCode)> GetPrivateTalkList(Guid userId);
        Task<(Guid, ResultCode)> AddEditMockInterview(BaseRequest<AddEditMockInterviewRequest> request, Guid userId, string userName);
        Task<(List<MockInterview>, ResultCode)> GetMockInterviewList(Guid userId);
        Task<ResultCode> RemoveMockInterview(Guid id, string reason, Guid userId, string userName);
        Task<ResultCode> RequestChangeMockInterview(BaseRequest<RequestChangeEventRequest> request, Guid userId, string userName);
        Task<(List<Feedback>, ResultCode)> GetFeedbackList();
    }
}
