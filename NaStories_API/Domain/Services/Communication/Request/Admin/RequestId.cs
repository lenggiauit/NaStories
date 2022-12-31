using System;
using System.ComponentModel.DataAnnotations;

namespace NaStories.API.Domain.Services.Communication.Request.Admin
{
    public class RequestId
    {
        [Required]
        public Guid Id { get; set; }
    }
}
