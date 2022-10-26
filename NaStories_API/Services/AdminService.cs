using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using NaStories.API.Domain.Entities;
using NaStories.API.Domain.Helpers;
using NaStories.API.Domain.Repositories;
using NaStories.API.Domain.Services;
using NaStories.API.Domain.Services.Communication.Request;
using NaStories.API.Domain.Services.Communication.Request.Admin;
using NaStories.API.Resources;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BlogPostFilterRequest = NaStories.API.Domain.Services.Communication.Request.Admin.BlogPostFilterRequest;

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

        public async  Task<(EventBookingDate, ResultCode)> AddEditEventAvailableDate(BaseRequest<AddEventAvailableDateRequest> request, Guid userId)
        {
            return await _adminRepository.AddEditEventAvailableDate(request, userId);
        }

        public async Task<ResultCode> CancelMockInterview(Guid payload, Guid userId)
        {
            return await _adminRepository.CancelMockInterview(payload, userId);
        }

        public async Task<ResultCode> CancelPrivateTalk(Guid payload, Guid userId)
        {
            return await _adminRepository.CancelPrivateTalk(payload, userId);
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

        public async Task<(List<EventBookingDate>, ResultCode)> GetEventAvailableDate()
        {
            return await _adminRepository.GetEventAvailableDate(_appSettings.BookingAdjustmentDay);
        }

        public async Task<(MockInterview, ResultCode)> GetMockInterviewDetail(Guid id)
        {
            return await _adminRepository.GetMockInterviewDetail(id);
        }

        public async Task<Guid> GetMockInterviewIdByEventBookingDate(GetMockInterviewIdByEventBookingDateRequest payload, Guid userId)
        {
            return await _adminRepository.GetMockInterviewIdByEventBookingDate(payload, userId);
        }

        public async Task<(List<MockInterview>, ResultCode)> GetMockInterviewList(BaseRequest<GetMockInterviewListFilterRequest> request)
        {
            return await _adminRepository.GetMockInterviewList(request);
        }

        public async Task<(PrivateTalk, ResultCode)> GetPrivateTalkDetail(Guid id)
        {
            return await _adminRepository.GetPrivateTalkDetail(id);
        }

        public async Task<Guid> GetPrivateTalkIdByEventBookingDate(GetPrivateTalkIdByEventBookingDateRequest payload, Guid userId)
        {
            return await _adminRepository.GetPrivateTalkIdByEventBookingDate(payload, userId);
        }

        public async Task<(List<PrivateTalk>, ResultCode)> GetPrivateTalkList(BaseRequest<GetPrivateTalkListFilterRequest> request)
        {
            return await _adminRepository.GetPrivateTalkList(request);
        }

        public async Task<(List<User>, ResultCode)> GetUserList()
        {
            return await _adminRepository.GetUserList();
        }

        public async Task<ResultCode> RemoveEventAvailableDate(BaseRequest<RemoveEventAvailableDateRequest> request, Guid userId)
        {
            return await _adminRepository.RemoveEventAvailableDate(request, userId);
        }

        public async Task<ResultCode> UpdateBlogPostStatus(BaseRequest<UpdateBlogPostStatusRequest> request, Guid userId)
        {
            return await _adminRepository.UpdateBlogPostStatus(request, userId);
        }

        public async Task<ResultCode> UpdateMockInterviewStatus(UpdateMockInterviewStatusRequest payload, Guid userId)
        {
            return await _adminRepository.UpdateMockInterviewStatus(payload, userId);
        }

        public async Task<ResultCode> UpdatePrivateTalkStatus(UpdatePrivateTalkStatusRequest payload, Guid userId)
        {
            return await _adminRepository.UpdatePrivateTalkStatus(payload, userId);
        }
    }
}
