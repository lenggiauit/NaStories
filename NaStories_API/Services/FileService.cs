﻿using Microsoft.AspNetCore.Http;
using NaStories.API.Domain.Entities;
using NaStories.API.Domain.Helpers;
using NaStories.API.Domain.Repositories;
using NaStories.API.Domain.Services;
using NaStories.API.Domain.Services.Communication.Request;
using NaStories.API.Domain.Services.Communication.Request.Admin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NaStories.API.Services
{
    public class FileService : IFileService
    {
        private readonly IFileWriter _fileWriter;
        private readonly IFileSharingRepository _fileSharingRepository;
        public FileService(IFileWriter fileWriter, IFileSharingRepository fileSharingRepository)
        {
            _fileWriter = fileWriter;
            _fileSharingRepository = fileSharingRepository;
        }

        public async Task<(FileSharing, ResultCode)> AddUpdateFileSharing(BaseRequest<AddUpdateFileSharingRequest> request, Guid userId)
        {
            return await _fileSharingRepository.AddUpdateFileSharing(request, userId);
        }

        public async Task<(List<FileSharing>, ResultCode)> GetFileSharing(BaseRequest<FileSharingSearchRequest> request)
        {
            return await _fileSharingRepository.GetFileSharing(request);
        }

        public async Task<(List<FileSharing>, ResultCode)> GetAdminFileSharing(BaseRequest<FileSharingSearchRequest> request, Guid userId)
        {
            return await _fileSharingRepository.GetAdminFileSharing(request, userId);
        } 

        public async Task<ResultCode> RemoveFileSharing(BaseRequest<RequestId> request, Guid userId)
        {
            return await _fileSharingRepository.RemoveFileSharing(request, userId);
        }

        public async Task<string> UploadImage(IFormFile file, string path)
        {
            return await _fileWriter.UploadImage(file, path);
        }

        public async Task<string> UploadTemplateZipFile(IFormFile file, string path)
        {
            return await _fileWriter.UploadFile(file, path);
        }
    }
}

