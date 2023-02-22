using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace NaStories.API.Domain.Entities
{
    public class Feedback : BaseEntity
    {

        [ForeignKey("User")]
        public Guid UserId { get; set; }
        public virtual User User { get; set; } 
        [NotMapped]
        public int TotalRows { get; set; }
    }
}
