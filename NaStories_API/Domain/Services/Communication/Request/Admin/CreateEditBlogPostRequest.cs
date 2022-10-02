using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace NaStories.API.Domain.Services.Communication.Request.Admin
{
    public class CreateEditBlogPostRequest
    {
        public Guid? Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Thumbnail { get; set; }
        [Required]
        [MaxLength(500)]
        public string ShortDescription { get; set; }
        [Required]
        public string Content { get; set; } 
        public bool IsDraft { get; set; }
        public bool IsPublic { get; set; }
        public bool IsArchived { get; set; }
        [Required]
        public  CategoryModel Category { get; set; }
        [Required]
        public List<TagModel> Tags { get; set; }

        
    }
    public class CategoryModel
    {
        [Required]
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; } 
    }

    public class TagModel
    {
        [Required]
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
    }


}
