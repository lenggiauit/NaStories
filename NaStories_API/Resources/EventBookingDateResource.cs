using System;

namespace NaStories.API.Resources
{
    public class EventBookingDateResource
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string EventName { get; set; } 
        public  UserResource User { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }
}
