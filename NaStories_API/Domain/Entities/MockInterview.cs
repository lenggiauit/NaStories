using NaStories.API.Domain.Helpers;
using NaStories.API.Extensions;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NaStories.API.Domain.Entities
{
    public class MockInterview : BaseEntity
    {
        [MaxLength(10)]
        public string Code { get; set; }
        [MaxLength(100)]
        public string FullName { get; set; }
        [MaxLength(150)]
        public string Email { get; set; }
        [MaxLength(150)]
        public string AgeRange { get; set; }
        [MaxLength(50)]
        public string Language { get; set; }
        [MaxLength(250)]
        public string Resume { get; set; }
        [MaxLength(250)]
        public string CoverLetter { get; set; }
        [MaxLength(250)]
        public string JobDescription { get; set; }
       
        public string Note { get; set; }

        public Guid? EventBookingDateId { get; set; }
        public virtual EventBookingDate EventBookingDate { get; set; }
        public Guid UserId { get; set; }
        public virtual User User { get; set; }
        [MaxLength(50)]
        public string EventStatus { get; set; }
        public bool IsDeleted { get; set; }
        public int RequestChangeCount { get; set; }

        [MaxLength(20)]
        public string RedeemCode { get; set; }

        [NotMapped]
        public bool IsEnableRequestChange
        {
            get
            {
                return this.RequestChangeCount < 1 
                    && !IsDeleted 
                    && this.EventStatus != MockInterviewStatusEnum.Canceled.ToDescriptionString() 
                    && this.EventStatus != MockInterviewStatusEnum.Completed.ToDescriptionString();

            }
        }

        [NotMapped]
        public bool IsEnableDelete
        {
            get
            { 
               
                return this.EventStatus != MockInterviewStatusEnum.Canceled.ToDescriptionString() && this.EventStatus != MockInterviewStatusEnum.Completed.ToDescriptionString();

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
