using System.ComponentModel.DataAnnotations;

namespace NaStories.API.Domain.Services.Communication.Request
{
    public class BlogPostByUrlRequest
    {
        [Required]
        public string Url { get; set; }
        public string Keywords { get; set; }
    }
}
