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
        Task<(Guid, ResultCode)> AddEditPrivateTalk(BaseRequest<AddEditPrivateTalkRequest> request, Guid userId);
        Task<ResultCode> RemovePrivateTalk(Guid id, string reason, Guid userId);
        Task<ResultCode> RequestChangePrivateTalk(BaseRequest<RequestChangePrivateTalkRequest> request, Guid userId);
        Task<(List<PrivateTalk>, ResultCode)> GetPrivateTalkList(Guid userId);
    }
}
