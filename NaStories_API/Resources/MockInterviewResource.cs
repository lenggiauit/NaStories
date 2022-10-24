using System;

namespace NaStories.API.Resources
{
    public class MockInterviewResource
    {
        public Guid Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string AgeRange { get; set; }
        public string Language { get; set; }
        public string Resume { get; set; }
        public string CoverLetter { get; set; }
        public string JobDescription { get; set; }
        public string Note { get; set; }
       
        public Guid? EventBookingDateId { get; set; }
        public EventBookingDateResource EventBookingDate { get; set; }
        public string EventStatus { get; set; }
        public bool IsEnableRequestChange { get; set; }
        public string RedeemCode { get; set; }
        public string Code { get; set; }
    }
}
