namespace NaStories.API.Domain.Entities
{
    public class Tag : BaseEntity
    {
        public string Name { get; set; }
        public string Url { get; set; }
        public bool IsPublic { get; set; }
    }
}
