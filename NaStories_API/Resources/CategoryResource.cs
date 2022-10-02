﻿using System;

namespace NaStories.API.Resources
{
    public class CategoryResource
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }
        public string Color { get; set; }
        public bool IsArchived { get; set; }
    }
}
