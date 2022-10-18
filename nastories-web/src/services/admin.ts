import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ApiRequest, ApiResponse, AppSetting } from "../types/type";
import { getLoggedUser } from '../utils/functions'; 
import * as FormDataFile from "form-data";
import { Category } from './models/admin/category';
import { BlogPost } from './models/admin/blogPost';
import { Tag } from './models/tag'; 
import { EventBookingDate } from './models/admin/eventBookingDate';
import { ResultCode } from '../utils/enums';
import { PrivateTalk } from './models/admin/privateTalk';
import { EventBookingDateResource } from './resources/eventBookingDateResource';
 
let appSetting: AppSetting = require('../appSetting.json');

export const AdminService = createApi({
    reducerPath: 'AdminService',

    baseQuery: fetchBaseQuery({
        baseUrl: appSetting.BaseUrl,
        prepareHeaders: (headers) => {
            const currentUser = getLoggedUser();
            // Add token to headers
            if (currentUser && currentUser.accessToken) {
                headers.set('Authorization', `Bearer ${currentUser.accessToken}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        GetCategory: builder.mutation<ApiResponse<Category[]>, ApiRequest<{isArchived: boolean }>>({
            query: (payload) => ({
                url: 'admin/getCategory',
                method: 'post',
                body: payload
            }),
            transformResponse(response: ApiResponse<Category[]>) {
                return response;
            },
        }),

        GetQueryCategory: builder.query<ApiResponse<Category[]>, ApiRequest<{ isArchived: boolean }>>({
            query: (payload) => ({
                url: 'admin/getCategory',
                method: 'post',
                body: payload
            }),
            transformResponse(response: ApiResponse<Category[]>) {
                return response;
            },
        }),

        CreateEditCategory: builder.mutation<ApiResponse<Category>, ApiRequest<{ id: any, name: any, color: any, description: any, isArchived: boolean }>>({
            query: (payload) => ({
                url: 'admin/createEditCategory',
                method: 'post',
                body: payload
            }),
            transformResponse(response: ApiResponse<Category>) {
                return response;
            },
        }),

        GetBlogPost: builder.mutation<ApiResponse<BlogPost[]>, ApiRequest<{ keywords: any, isAll?: boolean, isPublic?: boolean, isDraft?: boolean, isArchived: boolean }>>({
            query: (payload) => ({
                url: 'admin/getBlogPost',
                method: 'post',
                body: payload
            }),
            transformResponse(response: ApiResponse<BlogPost[]>) {
                return response;
            },
        }),

        CreateEditBlogPost: builder.mutation<ApiResponse<BlogPost>, 
                ApiRequest<{ 
                    id: any, 
                    title: any, 
                    thumbnail: any,
                    categoryId: any, 
                    shortDescription: any, 
                    content: any,
                    tags: any[],
                    isPublic: boolean,
                    isDraft: boolean,
                    isArchived: boolean 
                }>
            >({
            query: (payload) => ({
                url: 'admin/createEditBlogPost',
                method: 'post',
                body: payload
            }),
            transformResponse(response: ApiResponse<BlogPost>) {
                return response;
            },
        }),

        UpdateBlogPostStatus: builder.mutation<ApiResponse<Category>, ApiRequest<{ id: any, status: any }>>({
            query: (payload) => ({
                url: 'admin/updateBlogPostStatus',
                method: 'post',
                body: payload
            }),
            transformResponse(response: ApiResponse<Category>) {
                return response;
            },
        }),

        AddEditEventAvailableDate: builder.mutation<ApiResponse<EventBookingDate>, ApiRequest<{id: any, title: any, start: any, end: any }>>({
            query: (payload) => ({
                url: 'admin/AddEditEventAvailableDate',
                method: 'post',
                body: payload
            }),
            transformResponse(response: ApiResponse<EventBookingDate>) {
                return response;
            },
        }),
        RemoveEventAvailableDate: builder.mutation<ApiResponse<ResultCode>, ApiRequest<{id: any }>>({
            query: (payload) => ({
                url: 'admin/RemoveEventAvailableDate',
                method: 'post',
                body: payload
            }),
            transformResponse(response: ApiResponse<ResultCode>) {
                return response;
            },
        }),
        UpdatePrivateTalkStatus: builder.mutation<ApiResponse<ResultCode>, ApiRequest<{id: any, status?: any, eventBookingDateId?: any }>>({
            query: (payload) => ({
                url: 'admin/UpdatePrivateTalkStatus',
                method: 'post',
                body: payload
            }),
            transformResponse(response: ApiResponse<ResultCode>) {
                return response;
            },
        }),


        GetEventAvailableDate: builder.mutation<ApiResponse<EventBookingDate[]>, ApiRequest<null>>({
            query: (payload) => ({
                url: 'admin/GetEventAvailableDate',
                method: 'post',
                body: payload
            }),
            transformResponse(response: ApiResponse<EventBookingDate[]>) {
                return response;
            },
        }),
        GetEventAvailableDateQuery: builder.query<ApiResponse<EventBookingDate[]>, ApiRequest<null>>({
            query: (payload) => ({
                url: 'admin/GetEventAvailableDate',
                method: 'post',
                body: payload
            }),
            transformResponse(response: ApiResponse<EventBookingDate[]>) {
                return response;
            },
        }), 
        GetPrivateTalkList: builder.mutation<ApiResponse<PrivateTalk[]>, ApiRequest<{eventStatus?: any}>>({
            query: (payload) => ({
                url: 'admin/GetPrivateTalkList',
                method: 'POST',
                body: payload
            }),
            transformResponse(response: ApiResponse<PrivateTalk[]>) {
                return response;
            },
        }),
        GetPrivateTalkDetail: builder.query<ApiResponse<PrivateTalk>, ApiRequest<{id: any}>>({
            query: (payload) => ({
                url: 'admin/GetPrivateTalkDetail',
                method: 'POST',
                body: payload
            }),
            transformResponse(response: ApiResponse<PrivateTalk>) {
                return response;
            },
        }), 
        GetPrivateTalkIdByEventBookingDate: builder.mutation<ApiResponse<{ }>, ApiRequest<{eventBookingDateId: any}>>({
            query: (payload) => ({
                url: 'admin/GetPrivateTalkIdByEventBookingDate',
                method: 'POST',
                body: payload
            }),
            transformResponse(response: ApiResponse<{}>) {
                return response;
            },
        }),

    })
});

export const { useGetCategoryMutation, 
    useCreateEditCategoryMutation, 
    useGetBlogPostMutation, 
    useCreateEditBlogPostMutation, 
    useGetQueryCategoryQuery,  
    useUpdateBlogPostStatusMutation,
    useAddEditEventAvailableDateMutation,
    useGetEventAvailableDateMutation,
    useRemoveEventAvailableDateMutation,
    useGetPrivateTalkListMutation,
    useGetPrivateTalkDetailQuery,
    useGetEventAvailableDateQueryQuery,
    useUpdatePrivateTalkStatusMutation,
    useGetPrivateTalkIdByEventBookingDateMutation  } = AdminService;