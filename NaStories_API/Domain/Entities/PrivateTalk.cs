using NaStories.API.Domain.Helpers;
using NaStories.API.Extensions;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NaStories.API.Domain.Entities
{
    public class PrivateTalk : BaseEntity
    {
        [MaxLength(100)]
        public string FullName { get; set; }
        [MaxLength(250)]
        public string Email { get; set; }
        [MaxLength(100)]
        public string AgeRange { get; set; }
        [MaxLength(150)]
        public string Problem { get; set; }
        [MaxLength(150)]
        public string ProblemOther { get; set; }
        [MaxLength(500)]
        public string ProblemDescription { get; set; }
        [MaxLength(500)]
        public string YourSolutionDescription { get; set; }
        [MaxLength(500)]
        public string YourExpectationDescription { get; set; }
        public Guid? EventBookingDateId { get; set; }
        public virtual EventBookingDate EventBookingDate { get; set; }
        public Guid UserId { get; set; }
        public virtual User User { get; set; }
        [MaxLength(50)]
        public string EventStatus { get; set; }
        public bool IsDeleted { get; set; }
        public int RequestChangeCount { get; set; }
        [NotMapped]
        public bool IsEnableRequestChange {
            get {
                return this.RequestChangeCount <= 2 && this.EventStatus == PrivateTalkStatusEnum.Submitted.ToDescriptionString();

            }
        }
        [NotMapped]
        public virtual EventRequestChangeReason EventRequestChangeReason { get; set; }
        [NotMapped]
        public virtual EventCancelReason EventCancelReason { get; set; }

        [NotMapped]
        public int TotalRows { get; set; }
    }
}
