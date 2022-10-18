using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NaStories.API.Domain.Entities
{
    public class EventRequestChangeReason
    {
        [Key]
        public Guid Id { get; set; }
        [MaxLength(250)]
        public string Reason { get; set; }
        public Guid? PrivateTalkId { get; set; }
        public Guid? MockInterviewId { get; set; }
        public Guid? EventBookingDateId { get; set; }
        [NotMapped]
        public virtual EventBookingDate EventBookingDate { get; set; }
        public DateTime CreateDate { get; set; }
        public Guid CreateBy { get; set; }
        public bool IsActive { get; set; }
    }
}
