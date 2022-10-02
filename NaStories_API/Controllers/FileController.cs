using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using NaStories.API.Domain.Helpers;
using NaStories.API.Domain.Services;
using NaStories.API.Domain.Services.Communication.Response;
using NaStories.API.Infrastructure;
using NaStories.API.Resources;
using System;
using System.IO;
using System.Threading.Tasks;
using System.Linq;

namespace NaStories.API.Controllers
{
    [Authorize] 
    [Route("File")]
    public class FileController : BaseController
    {
        private readonly IFileService _fileService; 
        private readonly ILogger<FileController> _logger;
        private readonly AppSettings _appSettings; 

        public FileController(IFileService fileService, ILogger<FileController> logger, IOptions<AppSettings> appSettings)
        {
            _fileService = fileService;
            _logger = logger; 
            _appSettings = appSettings.Value;
        } 
        [HttpPost("UploadImage")]
        public async Task<BaseResponse<FileResource>> UploadImage(IFormFile file)
        {
            string path = Path.Combine(Directory.GetCurrentDirectory(), _appSettings.FileFolderPath);
            string fileName = await _fileService.UploadImage(file, path);
            if (!string.IsNullOrEmpty(fileName))
            {
                return new BaseResponse<FileResource>(new FileResource
                {
                    FileName = fileName,
                    Url = string.Format("{0}://{1}{2}/{3}", Request.Scheme, Request.Host.Value, _appSettings.FileRequestUrl, fileName)
                }); ;
            }
            else
            {
                return new BaseResponse<FileResource>("Cannot image upload!", ResultCode.Unknown);
            }
        }
        [HttpPost("UploadPackageFile")]
        public async Task<BaseResponse<FileResource>> UploadPackageFile(IFormFile file)
        {
            if (_appSettings.TemplateSupportExtension.Any(e => e.ToLower().Equals(file.ContentType.ToLower()))) {
                string path = Path.Combine(Directory.GetCurrentDirectory(), _appSettings.FileFolderPath);
                string fileName = await _fileService.UploadTemplateZipFile(file, path);
                if (!string.IsNullOrEmpty(fileName))
                {
                    return new BaseResponse<FileResource>(new FileResource
                    {
                        FileName = fileName,
                        Url = string.Format("{0}://{1}{2}/{3}", Request.Scheme, Request.Host.Value, _appSettings.TemplateRequestUrl, fileName)
                    }); ;
                }
                else
                {
                    return new BaseResponse<FileResource>("Cannot file upload!", ResultCode.Unknown);
                }
            }
            else
            {
                return new BaseResponse<FileResource>("File doesn't not support!", ResultCode.Unknown);
            }
        }
    }
}
