using NaStories.API.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NaStories.API.Domain.Services
{
    public interface IBlogService
    {
        Task<List<Category>> GetCategory();
    }
}
