using NaStories.API.Domain.Entities;
using NaStories.API.Domain.Helpers;
using NaStories.API.Domain.Services.Communication.Request;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NaStories.API.Domain.Repositories
{
    public interface IEventRepository
    {
        Task<(List<EventBookingDate>, ResultCode)> GetEventBookingAvaiableDate(int adjustmentDay);
        Task<(Guid, ResultCode)> AddEditPrivateTalk(BaseRequest<AddEditPrivateTalkRequest> request, Guid userId);
        Task<(List<PrivateTalk>, ResultCode)> GetPrivateTalkList(Guid userId);
        Task<ResultCode> RemovePrivateTalk(Guid id, string reason, Guid userId);
        Task<ResultCode> RequestChangePrivateTalk(BaseRequest<RequestChangeEventRequest> request, Guid userId);
        Task<(Guid, ResultCode)> AddEditMockInterview(BaseRequest<AddEditMockInterviewRequest> request, Guid userId);
        Task<(List<MockInterview>, ResultCode)> GetMockInterviewList(Guid userId);
        Task<ResultCode> RemoveMockInterview(Guid id, string reason, Guid userId);
        Task<ResultCode> RequestChangeMockInterview(BaseRequest<RequestChangeEventRequest> request, Guid userId);
    }
}
