﻿using NaStories.API.Domain.Entities;
using NaStories.API.Domain.Helpers;
using NaStories.API.Domain.Services.Communication.Request; 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NaStories.API.Domain.Repositories
{
    public interface IAccountRepository
    {
        Task<User> GetById(Guid id);
        Task<User> Login(string name, string password);
        Task<User> LoginWithGoogle(string email);
        Task<ResultCode> Register(string name, string email, string password);
        Task<ResultCode> CheckEmail(string email);
        Task<ResultCode> CheckUserName(string userName);
        Task<User> GetByEmail(string email);
        Task UpdateUserPasword(Guid id, string newPassword);
        Task<bool> UpdateProfile(Guid id, UpdateProfileRequest payload);
        Task<bool> UpdateUserAvatar(Guid id, string avartarUrl);
        Task<ResultCode> CheckEmailWithUser(string email, Guid id);
        Task<ResultCode> Register(string name, string email, string password, string fullname, string avatar);
        Task<ResultCode> SendFeedback(BaseRequest<FeedbackRequest> request, Guid userId);
    }
}
