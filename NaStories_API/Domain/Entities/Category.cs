using NaStories.API.Domain.Entities;

namespace NaStories.API.Domain.Entities
{
    public class Category : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }
        public string Color { get; set; }
        public bool IsArchived { get; set; }

    }
}
