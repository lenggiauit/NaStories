﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Newtonsoft.Json;
using NaStories.API.Domain.Entities;
using NaStories.API.Domain.Services.Communication.Response;
using NaStories.API.Resources;
using System; 
using System.Linq;
using System.Security.Claims;
using static NaStories.API.Domain.Helpers.AccessToken;

namespace NaStories.API.Domain.Helpers
{
    [AttributeUsage(AttributeTargets.Method)]
    public class PermissionsAttribute : Attribute, IAuthorizationFilter 
    {
        public readonly string[] _permissions;
        public PermissionsAttribute(params string[] permissions)
        {
            _permissions = permissions;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var claimUser = context.HttpContext.User.Claims.Where(c => c.Type == ClaimTypes.UserData).FirstOrDefault();
            if (claimUser == null)
            {
                context.Result = new JsonResult( new BaseResponse<ResultCode>("UnAuthorized",  ResultCode.UnAuthorized)); 
            }
            else
            {
                try
                {
                    UserToken userResource = JsonConvert.DeserializeObject<UserToken>(claimUser.Value);
                    if (!userResource.Permissions.Select(p => p.Code).AsEnumerable().Intersect(_permissions.AsEnumerable()).Any())
                    {
                        context.Result = new JsonResult(new BaseResponse<ResultCode>("Do not permission", ResultCode.DoNotPermission));
                    }
                }
                catch
                {
                    context.Result = new JsonResult(new BaseResponse<ResultCode>("Unknown error", ResultCode.Unknown));
                }
            }
        }
    }
}
