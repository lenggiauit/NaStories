using System;
using System.ComponentModel.DataAnnotations;

namespace NaStories.API.Domain.Entities
{
    public class MockInterview : BaseEntity
    {
        [MaxLength(100)]
        public string FullName { get; set; }
        [MaxLength(150)]
        public string Email { get; set; }
        [MaxLength(150)]
        public string AgeRange { get; set; }
        [MaxLength(250)]
        public string Resume { get; set; }
        [MaxLength(250)]
        public string CoverLetter { get; set; }
        [MaxLength(250)]
        public string JobDescription { get; set; }
        [MaxLength(500)]
        public string Note { get; set; }

        public Guid? EventBookingDateId { get; set; }
        public virtual EventBookingDate EventBookingDate { get; set; }
        public Guid UserId { get; set; }
        public virtual User User { get; set; }
        [MaxLength(50)]
        public string EventStatus { get; set; }
    }
}
