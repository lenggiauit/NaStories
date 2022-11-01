using System;
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
        DoNotPermission = 7,
        BookingDateIsInvalid = 8,

    }
     
    public enum CacheKeys
    {
        [Description("YoutubeVideos")]
        YoutubeVideos
    }

    public enum PrivateTalkStatusEnum
    {
        [Description("Chờ email xác nhận")]
        Submitted, 
        [Description("Chờ thanh toán")]
        RequestPay,
        [Description("Đã thanh toán")]
        Paid,
        [Description("Đã xác nhận lịch hẹn")]
        Confirmed,
        [Description("Hoàn thành")]
        Completed, 
        [Description("Đã hủy")]
        Canceled,
        [Description("Chờ xác nhận")]
        Pending, 
    }

    public enum MockInterviewStatusEnum
    {
        [Description("Chờ email xác nhận")]
        Submitted,
        [Description("Chờ thanh toán")]
        RequestPay,
        [Description("Đã thanh toán")]
        Paid,
        [Description("Đã xác nhận lịch hẹn")]
        Confirmed,
        [Description("Hoàn thành")]
        Completed, 
        [Description("Đã hủy")]
        Canceled,
        [Description("Chờ xác nhận")]
        Pending,
    }



}
