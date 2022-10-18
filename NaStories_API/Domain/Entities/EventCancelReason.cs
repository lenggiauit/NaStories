using System;
using System.ComponentModel.DataAnnotations;

namespace NaStories.API.Domain.Entities
{
    public class EventCancelReason
    {
        [Key]
        public Guid Id { get; set; }
        [MaxLength(250)]
        public string Reason { get; set; }
        public Guid? PrivateTalkId { get; set; }
        public Guid? MockInterviewId { get; set; }
        public DateTime CreateDate { get;set;} 
        public Guid CreateBy { get; set; }
    }
}
