using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace NaStories.API.Domain.Entities
{
    public class EventBookingDate: BaseEntity
    {
        public string Title { get; set; }
        public string EventName { get; set; }
         
        public Guid? UserId { get; set; }
        public virtual User User { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }

    }
}
