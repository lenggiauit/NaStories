﻿using System;
using System.ComponentModel.DataAnnotations;

namespace NaStories.API.Domain.Services.Communication.Request
{
    public class RemovePrivateTalkRequest
    {
        [Required]
        public Guid Id { get; set; }
        [Required]
        [MaxLength(250)]
        public string Reason { get; set; }
        
    }
}
