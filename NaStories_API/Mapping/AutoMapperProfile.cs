using AutoMapper;
using NaStories.API.Domain.Entities;
using NaStories.API.Domain.Models;
using NaStories.API.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NaStories.API.Mapping
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        { 
            CreateMap<User, UserResource>(); 
            CreateMap<Role, RoleResource>();
            CreateMap<Permission, PermissionResource>();
            
            // Ref
            CreateMap<RefModel, RefResource>(); 
            CreateMap<Conversation,ConversationResource>();
            CreateMap<User, ConversationerResource>();
            CreateMap<ConversationMessage, ConversationMessageResource>(); 
            
            CreateMap<Language, LanguageResource>();
            //
            CreateMap<Category, CategoryResource>();
            CreateMap<Tag, TagResource>();
            CreateMap<BlogPost, BlogPostResource>();
            CreateMap<Comment, CommentResource>();
            CreateMap<YoutubeVideo, YoutubeVideoResource>();
            CreateMap<EventBookingDate, EventBookingDateResource>();
            CreateMap<PrivateTalk, PrivateTalkResource>();
            CreateMap<Notification, NotificationResource>();
            CreateMap<MockInterview, MockInterviewResource>();


        }
    }
}