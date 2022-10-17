using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using NaStories.API.Domain.Entities;
using NaStories.API.Domain.Helpers;
using NaStories.API.Domain.Repositories;
using NaStories.API.Domain.Services.Communication.Request;
using NaStories.API.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NaStories.API.Persistence.Repositories
{
    public class EventRepository : BaseRepository, IEventRepository
    {
        private readonly ILogger<EventRepository> _logger;
        public EventRepository(NaStoriesContext context, ILogger<EventRepository> logger) : base(context)
        {
            _logger = logger;
        }

        public async Task<(Guid, ResultCode)> AddEditPrivateTalk(BaseRequest<AddEditPrivateTalkRequest> request, Guid userId)
        {
            try
            {
                if (request.Payload.Id == null || request.Payload.Id.Equals(Guid.Empty))
                {
                    Guid newId = Guid.NewGuid();
                    var privateTalk = new PrivateTalk()
                    {
                        Id = newId,
                        FullName = request.Payload.FullName,
                        Email = request.Payload.Email,
                        AgeRange = request.Payload.AgeRange,
                        Problem = request.Payload.Problem,
                        ProblemOther = request.Payload.ProblemOther,
                        EventBookingDateId = request.Payload.EventBookingDateId,
                        EventStatus = EventStatus.Submitted.ToDescriptionString(),
                        ProblemDescription = request.Payload.ProblemDescription, 
                        YourExpectationDescription = request.Payload.YourExpectationDescription,
                        YourSolutionDescription = request.Payload.YourSolutionDescription,
                        UserId = userId,
                        CreatedBy = userId,
                        CreatedDate = DateTime.Now, 
                    };
                    await _context.PrivateTalk.AddAsync(privateTalk);

                    if(request.Payload.EventBookingDateId != null && !request.Payload.EventBookingDateId.Equals(Guid.Empty))
                    {
                        var bookingDate = await _context.EventBookingDate.Where(b => b.Id.Equals(request.Payload.EventBookingDateId)).FirstOrDefaultAsync();
                       
                        if (bookingDate != null)
                        {
                            bookingDate.UserId = userId;
                            bookingDate.Title = "Private Talk - " + request.Payload.FullName;
                            bookingDate.EventName = "Private Talk";
                            bookingDate.UpdatedDate = DateTime.Now;
                             _context.EventBookingDate.Update(bookingDate);
                        }


                    }

                    await _context.SaveChangesAsync();
                    return (newId, ResultCode.Success);
                }
                else
                {
                    var privateTalk = await _context.PrivateTalk.Where(c => c.Id.Equals(request.Payload.Id)).FirstOrDefaultAsync();
                    if (privateTalk != null)
                    {
                        privateTalk.FullName = request.Payload.FullName;
                        privateTalk.Email = request.Payload.Email;
                        privateTalk.AgeRange = request.Payload.AgeRange;
                        privateTalk.Problem = request.Payload.Problem;
                        privateTalk.ProblemOther = request.Payload.ProblemOther;
                        privateTalk.EventBookingDateId = request.Payload.EventBookingDateId;
                        privateTalk.EventStatus = EventStatus.Submitted.ToDescriptionString();
                        privateTalk.ProblemDescription = request.Payload.ProblemDescription;
                        privateTalk.YourExpectationDescription = request.Payload.YourExpectationDescription;
                        privateTalk.YourSolutionDescription = request.Payload.YourSolutionDescription;
                        privateTalk.UpdatedBy = userId;
                        privateTalk.UpdatedDate = DateTime.Now;
                        
                    }
                    _context.PrivateTalk.Update(privateTalk);
                    await _context.SaveChangesAsync();
                    return (Guid.Empty, ResultCode.Success);
                }

            }
            catch (Exception ex)
            {
                _logger.LogError("Error at AddEditPrivateTalk method: " + ex.Message);
                return (Guid.Empty, ResultCode.Error);
            }
        }

        public async Task<(List<EventBookingDate>, ResultCode)> GetEventBookingAvaiableDate(int adjustmentDay)
        {
            try
            {
                return (await _context.EventBookingDate
                    .Where(e => e.UserId == null && e.Start > DateTime.UtcNow.AddDays(adjustmentDay))
                    .OrderBy(e => e.Start)
                    .AsNoTracking() 
                    .ToListAsync(), ResultCode.Success);

            }
            catch (Exception ex)
            {
                _logger.LogError("Error at GetEventBookingAvaiableDate method: " + ex.Message);
                return (null, ResultCode.Error);
            }
        }
    }
}
