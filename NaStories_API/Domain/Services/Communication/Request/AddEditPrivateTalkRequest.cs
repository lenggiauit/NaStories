using System;
using System.ComponentModel.DataAnnotations;

namespace NaStories.API.Domain.Services.Communication.Request
{
    public class AddEditPrivateTalkRequest
    {
        public Guid? Id { get; set; }
        [Required]
        public string FullName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string AgeRange { get; set; }
        [Required]
        public string Problem { get; set; } 
        public string ProblemOther { get; set; }
        [Required]
        public string ProblemDescription { get; set; }
        [Required]
        public string YourSolutionDescription { get; set; }
        [Required]
        public string YourExpectationDescription { get; set; }
        public Guid? EventBookingDateId { get; set; } 
    }
}
