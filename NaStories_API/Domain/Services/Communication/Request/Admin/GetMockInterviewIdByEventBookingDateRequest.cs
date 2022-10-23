using System;
using System.ComponentModel.DataAnnotations;

namespace NaStories.API.Domain.Services.Communication.Request.Admin
{
    public class GetMockInterviewIdByEventBookingDateRequest
    {
        [Required]
        public Guid EventBookingDateId { get; set; }
    }
}
