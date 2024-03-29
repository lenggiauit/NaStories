﻿using NaStories.API.Domain.Entities;
using NaStories.API.Domain.Helpers;
using NaStories.API.Domain.Services.Communication.Request;
using NaStories.API.Domain.Services.Communication.Request.Admin;
using NaStories.API.Resources;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BlogPostFilterRequest = NaStories.API.Domain.Services.Communication.Request.Admin.BlogPostFilterRequest;

namespace NaStories.API.Domain.Repositories
{
    public interface IAdminRepository
    {
        Task<(List<Category>, ResultCode)> GetCategory(BaseRequest<CategoryFilterRequest> request);
        Task<ResultCode> CheckCategoryName(string name, Guid? categoryid);
        Task<(Category, ResultCode)> CreateEditCategory(BaseRequest<CreateEditCategoryRequest> request, Guid userId);
        Task<ResultCode> CheckBlogPostTitle(string title, Guid? blogPostId);
        Task<(BlogPost, ResultCode)> CreateEditBlogPost(BaseRequest<CreateEditBlogPostRequest> request, Guid userId);
        Task<(List<BlogPost>, ResultCode)> GetBlogPost(BaseRequest<BlogPostFilterRequest> request);
        Task<ResultCode> UpdateBlogPostStatus(BaseRequest<UpdateBlogPostStatusRequest> request, Guid userId);
        Task<(List<EventBookingDate>, ResultCode)> GetEventAvailableDate(int adjustmentDays);
        Task<(EventBookingDate, ResultCode)> AddEditEventAvailableDate(BaseRequest<AddEventAvailableDateRequest> request, Guid userId);
        Task<ResultCode> RemoveEventAvailableDate(BaseRequest<RemoveEventAvailableDateRequest> request, Guid userId);
        Task<(List<PrivateTalk>, ResultCode)> GetPrivateTalkList(BaseRequest<GetPrivateTalkListFilterRequest> request);
        Task<(PrivateTalk, ResultCode)> GetPrivateTalkDetail(Guid id);
        Task<ResultCode> UpdatePrivateTalkStatus(UpdatePrivateTalkStatusRequest payload, Guid userId);
        Task<ResultCode> CancelMockInterview(Guid payload, Guid userId);
        Task<Guid> GetPrivateTalkIdByEventBookingDate(GetPrivateTalkIdByEventBookingDateRequest payload, Guid userId);
        Task<ResultCode> CancelPrivateTalk(Guid payload, Guid userId);
        Task<(List<MockInterview>, ResultCode)> GetMockInterviewList(BaseRequest<GetMockInterviewListFilterRequest> request);
        Task<(MockInterview, ResultCode)> GetMockInterviewDetail(Guid id);
        Task<ResultCode> UpdateMockInterviewStatus(UpdateMockInterviewStatusRequest payload, Guid userId);
        Task<Guid> GetMockInterviewIdByEventBookingDate(GetMockInterviewIdByEventBookingDateRequest payload, Guid userId);
        Task<(List<User>, ResultCode)> GetUserList();
        Task<ResultCode> DeleteReasonChangeMockInterview(Guid id, Guid userId);
        Task<ResultCode> DeleteReasonChangePrivateTalk(Guid id, Guid userId);
        Task<(List<Feedback>, ResultCode)> GetFeedbackList(BaseRequest<GetFeedbackRequest> request);
        Task<ResultCode> RemoveFeedback(Guid id, Guid userId);
        Task<ResultCode> UpdateFeedbackStatus(Guid id, Guid userId);
    }
}
