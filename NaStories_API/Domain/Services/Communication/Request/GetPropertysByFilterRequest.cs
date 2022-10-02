using System;

namespace NaStories.API.Domain.Services.Communication.Request
{
    public class GetPropertysByFilterRequest
    {
        public Guid? TypeId { get; set; }
        public bool IsArchived { get; set; }

    }
}
