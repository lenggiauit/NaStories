﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NaStories.API.Resources
{
    public class RoleResource
    {
        public Guid Id { get; set; } 
        public string Name { get; set; } 
        public string Description { get; set; }
    }
}
