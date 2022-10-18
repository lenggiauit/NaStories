using System;
using System.ComponentModel.DataAnnotations;

namespace NaStories.API.Domain.Services.Communication.Request
{
    public class RequestChangePrivateTalkRequest
    {
        [Required]
        public Guid EventId { get; set; }
        public Guid? EventBookingDateId { get; set; }
        [Required]
        public string Reason { get; set; }
    }
}
