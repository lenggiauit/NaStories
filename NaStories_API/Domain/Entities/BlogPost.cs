using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace NaStories.API.Domain.Entities
{
    public class BlogPost : BaseEntity
    {
        public string Title { get; set; }
        public string Thumbnail { get; set; }
        public string Content { get; set; } 
        public string Url { get; set; }
        public int View { get; set; }
        public int Comment { get; set; }
        public bool IsDraft { get; set; }
        public bool IsPublic { get; set; }
        public bool IsArchived { get; set; }

        [ForeignKey("Category")]
        public Guid CategoryId { get; set; }
        public virtual Category Category { get; set; }

        [ForeignKey("User")]
        public Guid UserId { get; set; }
        public virtual User User { get; set; } 
        public virtual ICollection<Tag> Tags { get; set; }
         
        public string ShortDescription { get; set; }

        [NotMapped]
        public int TotalRows { get; set; }

    }
}
