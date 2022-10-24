using System;
using System.ComponentModel.DataAnnotations;

namespace NaStories.API.Domain.Services.Communication.Request
{
    public class AddEditMockInterviewRequest
    {
        public Guid? Id { get; set; }
        [Required]
        [MaxLength(100)]
        public string FullName { get; set; }
        [Required]
        [MaxLength(250)]
        public string Email { get; set; }
        [Required]
        [MaxLength(50)]
        public string Language { get; set; }
        [Required]
        [MaxLength(100)]
        public string AgeRange { get; set; }

        [Required]
        [MaxLength(250)]
        public string Resume { get; set; }

        [Required]
        [MaxLength(250)]
        public string Jobdescription { get; set; }
        
        [Required]
        [MaxLength(250)]
        public string CoverLetter { get; set; }

        
        [MaxLength(500)]
        public string Note { get; set; }
        
        public Guid? EventBookingDateId { get; set; }

        [MaxLength(20)]
        public string RedeemCode { get; set; }
    }
}
