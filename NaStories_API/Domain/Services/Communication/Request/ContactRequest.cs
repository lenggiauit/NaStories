using System.ComponentModel.DataAnnotations;

namespace NaStories.API.Domain.Services.Communication.Request
{
    public class ContactRequest
    {
        [Required]
        public string YourName { get; set; }
        [Required]
        public string YourEmail { get; set; }
        [Required]
        public string YourMessage { get; set; }
    }
}
