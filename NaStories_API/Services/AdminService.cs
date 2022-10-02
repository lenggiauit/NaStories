using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using NaStories.API.Domain.Entities;
using NaStories.API.Domain.Helpers;
using NaStories.API.Domain.Repositories;
using NaStories.API.Domain.Services;
using NaStories.API.Domain.Services.Communication.Request;
using NaStories.API.Domain.Services.Communication.Request.Admin;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NaStories.API.Services
{
    public class AdminService : IAdminService
    {
        private readonly IAdminRepository _adminRepository;
        private readonly IEmailService _emailService;
        private readonly IUnitOfWork _unitOfWork;
        private readonly AppSettings _appSettings;
        private readonly ILogger<AdminService> _logger;

        public AdminService(IAdminRepository adminRepository, IEmailService emailService, ILogger<AdminService> logger, IUnitOfWork unitOfWork, IOptions<AppSettings> appSettings)
        {
            _adminRepository = adminRepository;
            _emailService = emailService;
            _logger = logger;
            _unitOfWork = unitOfWork;
            _appSettings = appSettings.Value;
        }

        public async Task<ResultCode> CheckBlogPostTitle(string title, Guid? blogPostId)
        {
            return await _adminRepository.CheckBlogPostTitle(title, blogPostId);
        }

        public async Task<ResultCode> CheckCategoryName(string name, Guid? categoryid)
        {
            return await _adminRepository.CheckCategoryName(name, categoryid);
        }

        public async Task<(BlogPost, ResultCode)> CreateEditBlogPost(BaseRequest<CreateEditBlogPostRequest> request, Guid userId)
        {
            return await _adminRepository.CreateEditBlogPost(request, userId);
        }

        public async Task<(Category, ResultCode)> CreateEditCategory(BaseRequest<CreateEditCategoryRequest> request, Guid userId)
        {
            return await _adminRepository.CreateEditCategory(request, userId);
        }

        public async Task<(List<BlogPost>, ResultCode)> GetBlogPost(BaseRequest<BlogPostFilterRequest> request)
        {
            return await _adminRepository.GetBlogPost(request);
        }

        public async Task<(List<Category>, ResultCode)> GetCategory(BaseRequest<CategoryFilterRequest> request)
        {
            return await _adminRepository.GetCategory(request);
        }
    }
}
