using System;

namespace NaStories.API.Resources
{
    public class PrivateTalkResource
    {
        public Guid Id { get; set; }
        public string FullName { get; set; } 
        public string Email { get; set; } 
        public string AgeRange { get; set; } 
        public string Problem { get; set; } 
        public string ProblemOther { get; set; } 
        public string ProblemDescription { get; set; } 
        public string YourSolutionDescription { get; set; } 
        public string YourExpectationDescription { get; set; }
        public Guid? EventBookingDateId { get; set; }
        public EventBookingDateResource EventBookingDate { get; set; }  
        public string EventStatus { get; set; }
    }
}
