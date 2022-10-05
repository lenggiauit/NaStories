﻿using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using NaStories.API.Domain.Entities;
using NaStories.API.Domain.Helpers;
using NaStories.API.Domain.Repositories;
using NaStories.API.Domain.Services;
using NaStories.API.Domain.Services.Communication.Request;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NaStories.API.Services
{
    public class BlogService : IBlogService
    {
        private readonly IBlogRepository _blogRepository;
        private readonly IEmailService _emailService;
        private readonly IUnitOfWork _unitOfWork;
        private readonly AppSettings _appSettings;
        private readonly ILogger<BlogService> _logger;

        public BlogService(IBlogRepository blogRepository, IEmailService emailService, ILogger<BlogService> logger, IUnitOfWork unitOfWork, IOptions<AppSettings> appSettings)
        {
            _blogRepository = blogRepository;
            _emailService = emailService;
            _logger = logger;
            _unitOfWork = unitOfWork;
            _appSettings = appSettings.Value;
        }

        public async Task<(List<Category>, ResultCode)> GetCategory()
        {
            return await _blogRepository.GetCategory();
        }

        public async Task<(List<BlogPost>, ResultCode)> GetPosts(BaseRequest<BlogPostSearchRequest> request)
        {
            return await _blogRepository.GetPosts(request);
        }

        public async Task<(List<Tag>, ResultCode)> GetTags()
        {
            return await _blogRepository.GetTags();
        }

        public async Task<(List<BlogPost>, ResultCode)> GetTopPost()
        {
            return await _blogRepository.GetTopPost();
        }
    }
}