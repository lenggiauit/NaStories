﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace NaStories.API.Domain.Helpers
{
    public enum ResultCode
    {
        Invalid = -2,
        Unknown = -1,
        UnAuthorized = 0, 
        Success = 1,
        Valid = 11,
        Error = 2,
        RegisterExistEmail = 3,
        RegisterExistUserName = 4,
        NotExistUser = 5,
        NotExistEmail = 51,
        Expired = 6,
        DoNotPermission = 7

    }
    public enum ControlType
    {
        H1 =1,
        H2 = 2,
        H3 = 3,
        H4 = 4,
        H5 = 5,
        Div = 6,
        Section= 7,
        Container= 8,
        Header = 9,
        Input = 10,
        Label = 11,
        Main = 12,
        Row =13,
        Col = 14,
        EditLabel = 15

    }

    public enum CacheKeys
    {
        [Description("YoutubeVideos")]
        YoutubeVideos
    }

    public enum EventStatusEnum
    {
        [Description("Submitted")]
        Submitted,
        [Description("Reviewing")]
        Reviewing,
        [Description("RequestPay")]
        RequestPay,
        [Description("Paid")]
        Paid,
        [Description("Confirmed")]
        Confirmed,
        [Description("Completed")]
        Completed,
        [Description("Rejected")]
        Rejected,
        [Description("Canceled")]
        Canceled,
        [Description("Pending")]
        Pending,

    }



}
