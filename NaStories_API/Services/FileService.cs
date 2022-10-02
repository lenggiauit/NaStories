using Microsoft.AspNetCore.Http;
using NaStories.API.Domain.Helpers;
using NaStories.API.Domain.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NaStories.API.Services
{
    public class FileService : IFileService
    {
        private readonly IFileWriter _fileWriter;
        public FileService(IFileWriter fileWriter)
        {
            _fileWriter = fileWriter;
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

