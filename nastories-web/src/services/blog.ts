import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ApiRequest, ApiResponse, AppSetting } from "../types/type";
import { getLoggedUser } from '../utils/functions'; 
import * as FormDataFile from "form-data"; 
import { CategoryResource } from './resources/categoryResource';
import { TagResource } from './resources/tagResource';
import { BlogPostResource } from './resources/blogPostResource';
 
let appSetting: AppSetting = require('../appSetting.json');

export const BlogService = createApi({
    reducerPath: 'BlogService',

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
        GetCategory: builder.query<ApiResponse<CategoryResource[]>, null>({
            query: () => ({
                url: 'blog/getCategory',
                method: 'GET'
            }),
            transformResponse(response: ApiResponse<CategoryResource[]>) {
                return response;
            },
        }),
        GetTags: builder.query<ApiResponse<TagResource[]>, null>({
            query: () => ({
                url: 'blog/getTags',
                method: 'GET'
            }),
            transformResponse(response: ApiResponse<TagResource[]>) {
                return response;
            },
        }),
        GetTopPost: builder.query<ApiResponse<BlogPostResource[]>, null>({
            query: () => ({
                url: 'blog/getTopPost',
                method: 'GET'
            }),
            transformResponse(response: ApiResponse<BlogPostResource[]>) {
                return response;
            },
        }),
        GetBlogPost: builder.mutation<ApiResponse<BlogPostResource[]>, ApiRequest<{ keywords: any }>>({
            query: (payload) => ({
                url: 'blog/getBlogPost',
                method: 'POST',
                body: payload
            }),
            transformResponse(response: ApiResponse<BlogPostResource[]>) {
                return response;
            },
        }),
        GetPostDetail: builder.query<ApiResponse<BlogPostResource>, {postUrl: string}>({
            query: (params) => ({
                url: 'blog/GetBlogPostDetail?postUrl=' + params.postUrl,
                method: 'GET'
            }),
            transformResponse(response: ApiResponse<BlogPostResource>) {
                return response;
            },
        }),
        

    })
});

export const { useGetCategoryQuery, useGetTagsQuery, useGetTopPostQuery, useGetBlogPostMutation, useGetPostDetailQuery  } = BlogService;