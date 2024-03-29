﻿using System;
using System.ComponentModel.DataAnnotations;

namespace NaStories.API.Domain.Services.Communication.Request
{
    public class AddEditPrivateTalkRequest
    {
        public Guid? Id { get; set; }
        [Required]
        [MaxLength(100)]
        public string FullName { get; set; }
        [Required]
        [MaxLength(250)]
        public string Email { get; set; }
        [Required]
        [MaxLength(100)]
        public string AgeRange { get; set; }
        [Required]
        [MaxLength(150)]
        public string Problem { get; set; }
        [MaxLength(150)]
        public string ProblemOther { get; set; }
        [Required] 
        public string ProblemDescription { get; set; }
        [Required] 
        public string YourSolutionDescription { get; set; }
        [Required] 
        public string YourExpectationDescription { get; set; }
        public Guid? EventBookingDateId { get; set; }

        [MaxLength(20)]
        public string RedeemCode { get; set; }
    }
}
