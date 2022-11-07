using System;

namespace NaStories.API.Resources
{
    public class EventRequestChangeReasonResource
    {
        public Guid Id { get; set; } 
        public string Reason { get; set; }   
        public EventBookingDateResource EventBookingDate { get; set; }
    }
}
