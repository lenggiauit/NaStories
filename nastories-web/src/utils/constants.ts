
export enum GlobalKeys {
    LoggedUserKey = 'loggedUserKey_pm',
    EncryptKey = "encryptKey",
    LanguageSelectedKey = "naStories-lang",
    NoAvatarUrl = "/assets/images/Avatar.png",
    ProjectStatus = "ProjectStatusKey",
    NoTemplateImageUrl = "/assets/images/no_template_image.jpg",
    NoThumbnailUrl = "/assets/images/no_thumbnail_image.jpg"

}
export enum Locale {
    English = 'English',
    VietNam = 'Việt Nam'
}

export enum PermissionKeys { 
    Admin = "Admin",
    CreateEditCategory = "CreateEditCategory",
    CreateEditBlogPost = "CreateEditBlogPost",
    ManageUser = "ManageUser",
    CreateEditBooking = "CreateEditBooking",
    GetPrivateTalkList = "GetPrivateTalkList",
    UpdatePrivateTalkStatus = "UpdatePrivateTalkStatus",
    RemovePrivateTalk = "RemovePrivateTalk",
}

export enum PrivateTalkEnumStatus { 
    Submitted = "Submitted",
    Reviewing = "Reviewing",
    RequestPay = "RequestPay",
    Paid = "Paid",
    Confirmed = "Confirmed",
    Completed = "Completed",
    Rejected = "Rejected", 
    Canceled = "Canceled",
    Pending = "Pending",
}
 