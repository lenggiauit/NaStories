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

        public async Task<(Guid, ResultCode)> AddEditMockInterview(BaseRequest<AddEditMockInterviewRequest> request, Guid userId)
        {
            try
            {
                if (request.Payload.EventBookingDateId != null && !request.Payload.EventBookingDateId.Equals(Guid.Empty))
                {
                    var bookingDate = await _context.EventBookingDate.Where(b => b.Id.Equals(request.Payload.EventBookingDateId)).FirstOrDefaultAsync();

                    if (bookingDate != null && bookingDate.UserId != null)
                    {
                        return (Guid.Empty, ResultCode.BookingDateIsInvalid);
                    }
                     
                }


                if (request.Payload.Id == null || request.Payload.Id.Equals(Guid.Empty))
                {
                    Guid newId = Guid.NewGuid();
                    var mockInterview = new MockInterview()
                    {
                        Id = newId,
                        Code = "M-" + newId.ToString().Split('-')[0].ToUpper(),
                        RedeemCode = request.Payload.RedeemCode.ToUpper(),
                        FullName = request.Payload.FullName,
                        Email = request.Payload.Email,
                        AgeRange = request.Payload.AgeRange,
                        Language  = request.Payload.Language,
                        Resume = request.Payload.Resume,
                        JobDescription = request.Payload.Jobdescription,
                        EventBookingDateId = request.Payload.EventBookingDateId.Equals(Guid.Empty) ? null : request.Payload.EventBookingDateId,
                        EventStatus = MockInterviewStatusEnum.Submitted.ToString(),
                        CoverLetter = request.Payload.CoverLetter,
                        Note = request.Payload.Note.Replace("\n", "<br />"), 
                        UserId = userId,
                        CreatedBy = userId,
                        CreatedDate = DateTime.Now,
                    };
                    await _context.MockInterview.AddAsync(mockInterview);

                    if (request.Payload.EventBookingDateId != null && !request.Payload.EventBookingDateId.Equals(Guid.Empty))
                    {
                        var bookingDate = await _context.EventBookingDate.Where(b => b.Id.Equals(request.Payload.EventBookingDateId)).FirstOrDefaultAsync();

                        if (bookingDate != null)
                        {
                            bookingDate.UserId = userId;
                            bookingDate.Title = "Mock Interview - " + request.Payload.FullName;
                            bookingDate.EventName = "Mock Interview";
                            bookingDate.UpdatedDate = DateTime.Now;
                            _context.EventBookingDate.Update(bookingDate);
                        }
                    }

                    await _context.SaveChangesAsync();
                    return (newId, ResultCode.Success);
                }
                else
                {
                    var mockInterview = await _context.MockInterview.Where(c => c.Id.Equals(request.Payload.Id)).FirstOrDefaultAsync();
                    if (mockInterview != null)
                    {
                        mockInterview.FullName = request.Payload.FullName;
                        mockInterview.Email = request.Payload.Email;
                        mockInterview.AgeRange = request.Payload.AgeRange;
                        mockInterview.Language = request.Payload.Language;
                        mockInterview.Resume = request.Payload.Resume;
                        mockInterview.CoverLetter = request.Payload.CoverLetter;
                        mockInterview.EventBookingDateId = request.Payload.EventBookingDateId;
                        mockInterview.EventStatus = MockInterviewStatusEnum.Submitted.ToString();
                        mockInterview.JobDescription = request.Payload.Jobdescription;
                        mockInterview.Note = request.Payload.Note; 
                        mockInterview.UpdatedBy = userId;
                        mockInterview.UpdatedDate = DateTime.Now; 
                    }
                    _context.MockInterview.Update(mockInterview);
                    await _context.SaveChangesAsync();
                    return (mockInterview.Id, ResultCode.Success);
                }

            }
            catch (Exception ex)
            {
                _logger.LogError("Error at AddEditMockInterview method: " + ex.Message);
                return (Guid.Empty, ResultCode.Error);
            }
        }

        public async Task<(Guid, ResultCode)> AddEditPrivateTalk(BaseRequest<AddEditPrivateTalkRequest> request, Guid userId)
        {
            try
            {
                if (request.Payload.EventBookingDateId != null && !request.Payload.EventBookingDateId.Equals(Guid.Empty))
                {
                    var bookingDate = await _context.EventBookingDate.Where(b => b.Id.Equals(request.Payload.EventBookingDateId)).FirstOrDefaultAsync();

                    if (bookingDate != null && bookingDate.UserId != null)
                    {
                        return (Guid.Empty, ResultCode.BookingDateIsInvalid);
                    }

                }

                if (request.Payload.Id == null || request.Payload.Id.Equals(Guid.Empty))
                {
                    Guid newId = Guid.NewGuid();
                    var privateTalk = new PrivateTalk()
                    {
                        Id = newId,
                        Code = "P-" + newId.ToString().Split('-')[0].ToUpper(),
                        RedeemCode = request.Payload.RedeemCode.ToUpper(),
                        FullName = request.Payload.FullName,
                        Email = request.Payload.Email,
                        AgeRange = request.Payload.AgeRange,
                        Problem = request.Payload.Problem,
                        ProblemOther = request.Payload.ProblemOther,
                        EventBookingDateId = request.Payload.EventBookingDateId.Equals(Guid.Empty) ? null : request.Payload.EventBookingDateId,
                        EventStatus = PrivateTalkStatusEnum.Submitted.ToString(),
                        ProblemDescription = request.Payload.ProblemDescription.Replace("\n", "<br />"), 
                        YourExpectationDescription = request.Payload.YourExpectationDescription.Replace("\n", "<br />"),
                        YourSolutionDescription = request.Payload.YourSolutionDescription.Replace("\n", "<br />"),
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
                        privateTalk.EventStatus = PrivateTalkStatusEnum.Submitted.ToString();
                        privateTalk.ProblemDescription = request.Payload.ProblemDescription.Replace("\n", "<br />");
                        privateTalk.YourExpectationDescription = request.Payload.YourExpectationDescription.Replace("\n", "<br />");
                        privateTalk.YourSolutionDescription = request.Payload.YourSolutionDescription.Replace("\n", "<br />");
                        privateTalk.UpdatedBy = userId;
                        privateTalk.UpdatedDate = DateTime.Now;
                        
                    }
                    _context.PrivateTalk.Update(privateTalk);
                    await _context.SaveChangesAsync();
                    return (privateTalk.Id, ResultCode.Success);
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
                    .Take(15)
                    .ToListAsync(), ResultCode.Success);

            }
            catch (Exception ex)
            {
                _logger.LogError("Error at GetEventBookingAvaiableDate method: " + ex.Message);
                return (null, ResultCode.Error);
            }
        }

        public async Task<(List<MockInterview>, ResultCode)> GetMockInterviewList(Guid userId)
        {
            try
            {
                return (await _context.MockInterview.AsNoTracking()
                    .Where(p => p.UserId.Equals(userId))
                    .Include(p => p.EventBookingDate)
                    .OrderByDescending(p => p.CreatedDate)
                    .Select(p => new MockInterview()
                    {
                        Id = p.Id,
                        Code = p.Code,
                        RedeemCode = p.RedeemCode,
                        CreatedBy = p.CreatedBy,
                        CreatedDate = p.CreatedDate,
                        Email = p.Email,
                        FullName = p.FullName,
                        EventBookingDate = p.EventBookingDate,
                        Resume = p.Resume,
                        AgeRange = p.AgeRange,
                        EventStatus = p.EventStatus,
                        JobDescription = p.JobDescription,
                        CoverLetter = p.CoverLetter,
                        RequestChangeCount = p.RequestChangeCount,
                        Language = p.Language,
                        UpdatedBy = p.UpdatedBy,
                        Note = p.Note,
                        UpdatedDate = p.UpdatedDate,
                        EventRequestChangeReason = _context.EventRequestChangeReason
                        .Where(e => e.MockInterviewId == p.Id )
                        .OrderByDescending( e=> e.CreateDate )
                        .Select(e => new EventRequestChangeReason()
                        {
                            Id = e.Id,
                            Reason = e.Reason,
                            EventBookingDate = _context.EventBookingDate.Where( b => b.Id == e.EventBookingDateId).FirstOrDefault() 
                        })
                        .FirstOrDefault(),

                    })
                    .ToListAsync(), ResultCode.Success);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return (null, ResultCode.Error);
            }
        }

        public async Task<(List<PrivateTalk>, ResultCode)> GetPrivateTalkList(Guid userId)
        {
            try
            {
                return (await _context.PrivateTalk.AsNoTracking()
                    .Where(p => p.UserId.Equals(userId))
                    .Include(p => p.EventBookingDate)
                    .OrderByDescending(p => p.CreatedDate)
                    .Select(p => new PrivateTalk()
                    {
                        Id = p.Id,
                        Code = p.Code,
                        RedeemCode = p.RedeemCode,
                        CreatedBy = p.CreatedBy,
                        CreatedDate = p.CreatedDate,
                        Email = p.Email,
                        FullName = p.FullName,
                        EventBookingDate = p.EventBookingDate,
                        ProblemDescription = p.ProblemDescription,
                        AgeRange = p.AgeRange,
                        EventStatus = p.EventStatus,
                        Problem = p.Problem,
                        ProblemOther = p.ProblemOther,
                        UpdatedBy = p.UpdatedBy,
                        RequestChangeCount = p.RequestChangeCount,
                        YourExpectationDescription = p.YourExpectationDescription,
                        UpdatedDate = p.UpdatedDate,
                        YourSolutionDescription = p.YourSolutionDescription,
                        EventRequestChangeReason = _context.EventRequestChangeReason
                        .Where(e => e.PrivateTalkId == p.Id)
                        .OrderByDescending(e => e.CreateDate)
                        .Select(e => new EventRequestChangeReason()
                        {
                            Id = e.Id,
                            Reason = e.Reason,
                            EventBookingDate = _context.EventBookingDate.Where(b => b.Id == e.EventBookingDateId).FirstOrDefault()
                        })
                        .FirstOrDefault(),

                    })
                    
                    .ToListAsync(), ResultCode.Success);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return (null, ResultCode.Error);
            }
        }

        public async Task<ResultCode> RemoveMockInterview(Guid id, string reason, Guid userId)
        {
            try
            {
                var mockInterview = await _context.MockInterview.Where(n => n.UserId.Equals(userId) && n.Id.Equals(id)).FirstOrDefaultAsync();
                if (mockInterview != null)
                {
                    mockInterview.IsDeleted = true;
                    mockInterview.EventBookingDateId = null;
                    mockInterview.EventStatus = MockInterviewStatusEnum.Canceled.ToString();
                    _context.MockInterview.Update(mockInterview);

                    var cancelReason = new EventCancelReason()
                    {
                        Id = Guid.NewGuid(),
                        CreateBy = userId,
                        CreateDate = DateTime.Now,
                        PrivateTalkId = id,
                        Reason = reason,
                    };

                    await _context.EventCancelReason.AddAsync(cancelReason);

                    var changeReason = await _context.EventRequestChangeReason.Where(e => e.MockInterviewId.Equals(id)).FirstOrDefaultAsync();
                    if (changeReason != null)
                    {
                        _context.EventRequestChangeReason.Remove(changeReason);
                    }

                    var bookingDate = await _context.EventBookingDate.Where(b => b.UserId.Equals(mockInterview.UserId)).FirstOrDefaultAsync();

                    if (bookingDate != null)
                    {
                        bookingDate.UserId = null;
                        bookingDate.Title = "Available time";
                        bookingDate.EventName = null;
                        bookingDate.UpdatedDate = DateTime.Now;
                        _context.EventBookingDate.Update(bookingDate);
                    }


                    await _context.SaveChangesAsync();
                }
                return ResultCode.Success;

            }
            catch (Exception ex)
            {
                _logger.LogError("Error at RemoveMockInterview method: " + ex.Message);
                return ResultCode.Error;
            }
        }

        public async Task<ResultCode> RemovePrivateTalk(Guid id, string reason, Guid userId)
        {
            try
            {
                var privateTalk = await _context.PrivateTalk.Where(n => n.UserId.Equals(userId) && n.Id.Equals(id)).FirstOrDefaultAsync();
                if (privateTalk != null)
                {
                    privateTalk.IsDeleted = true;
                    privateTalk.EventStatus = PrivateTalkStatusEnum.Canceled.ToString();
                    privateTalk.EventBookingDateId = null;
                    privateTalk.EventBookingDateId = null;
                    _context.PrivateTalk.Update(privateTalk);

                    var cancelReason = new EventCancelReason()
                    {
                        Id = Guid.NewGuid(),
                        CreateBy = userId,
                        CreateDate = DateTime.Now,
                        PrivateTalkId = id,
                        Reason = reason,
                    };

                    await _context.EventCancelReason.AddAsync(cancelReason);

                    var changeReason = await _context.EventRequestChangeReason.Where(e => e.PrivateTalkId.Equals(id)).FirstOrDefaultAsync();
                    if(changeReason != null)
                    {
                        _context.EventRequestChangeReason.Remove(changeReason);
                    }

                     
                    var bookingDate = await _context.EventBookingDate.Where(b => b.UserId.Equals(privateTalk.UserId)).FirstOrDefaultAsync();

                    if (bookingDate != null)
                    {
                        bookingDate.UserId = null;
                        bookingDate.Title = "Available time";
                        bookingDate.EventName = null;
                        bookingDate.UpdatedDate = DateTime.Now;
                        _context.EventBookingDate.Update(bookingDate);
                    }
                     
                    await _context.SaveChangesAsync();
                }
                return ResultCode.Success;

            }
            catch (Exception ex)
            {
                _logger.LogError("Error at RemovePrivateTalk method: " + ex.Message);
                return ResultCode.Error;
            }
        }

        public async Task<ResultCode> RequestChangeMockInterview(BaseRequest<RequestChangeEventRequest> request, Guid userId)
        {
            try
            {
                var mockInterview = await _context.MockInterview.Where(n => n.UserId.Equals(userId) && n.Id.Equals(request.Payload.EventId)).FirstOrDefaultAsync();
                if (mockInterview != null)
                {
                    mockInterview.EventStatus = MockInterviewStatusEnum.Pending.ToString();
                    mockInterview.RequestChangeCount = 1;
                    _context.MockInterview.Update(mockInterview);

                    var changeReason = new EventRequestChangeReason()
                    {
                        Id = Guid.NewGuid(),
                        CreateBy = userId,
                        CreateDate = DateTime.Now,
                        MockInterviewId = request.Payload.EventId,
                        Reason = request.Payload.Reason,
                        EventBookingDateId = request.Payload.EventBookingDateId,
                        IsActive = true,
                    };

                    await _context.EventRequestChangeReason.AddAsync(changeReason);
                    await _context.SaveChangesAsync();
                }
                return ResultCode.Success;

            }
            catch (Exception ex)
            {
                _logger.LogError("Error at RequestChangeMockInterview method: " + ex.Message);
                return ResultCode.Error;
            }
        }

        public async Task<ResultCode> RequestChangePrivateTalk(BaseRequest<RequestChangeEventRequest> request, Guid userId)
        {
            try
            {
                var privateTalk = await _context.PrivateTalk.Where(n => n.UserId.Equals(userId) && n.Id.Equals( request.Payload.EventId)).FirstOrDefaultAsync();
                if (privateTalk != null)
                {
                    privateTalk.EventStatus = PrivateTalkStatusEnum.Pending.ToString();
                    privateTalk.RequestChangeCount = 1;
                    _context.PrivateTalk.Update(privateTalk);

                    var changeReason = new EventRequestChangeReason()
                    {
                        Id = Guid.NewGuid(),
                        CreateBy = userId,
                        CreateDate = DateTime.Now,
                        PrivateTalkId = request.Payload.EventId,
                        Reason = request.Payload.Reason,
                        EventBookingDateId = request.Payload.EventBookingDateId,
                        IsActive = true,
                    };

                    await _context.EventRequestChangeReason.AddAsync(changeReason);
                    await _context.SaveChangesAsync();
                }
                return ResultCode.Success;

            }
            catch (Exception ex)
            {
                _logger.LogError("Error at RemovePrivateTalk method: " + ex.Message);
                return ResultCode.Error;
            }
        }
    }
}
