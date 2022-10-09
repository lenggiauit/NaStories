import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ApiRequest, ApiResponse, AppSetting } from "../types/type";
import { getLoggedUser } from '../utils/functions'; 
import * as FormDataFile from "form-data"; 
import { CategoryResource } from './resources/categoryResource';
import { TagResource } from './resources/tagResource';
import { BlogPostRelatedResource, BlogPostResource } from './resources/blogPostResource';
import { CommentResource } from './resources/commentResource';
 
 
 
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
        GetRelatedPost: builder.query<ApiResponse<BlogPostRelatedResource[]>, {category: string, notIn: string}>({
            query: (params) => ({
                url: `blog/GetRelatedPost?category=${params.category}&notIn=${params.notIn}`,
                method: 'GET'
            }),
            transformResponse(response: ApiResponse<BlogPostRelatedResource[]>) {
                return response;
            },
        }),
        UserPostComment: builder.mutation<ApiResponse<CommentResource>, ApiRequest<{ postId: any, parentId: any, comment: any }>>({
            query: (payload) => ({
                url: 'blog/userPostComment',
                method: 'POST',
                body: payload
            }),
            transformResponse(response: ApiResponse<CommentResource>) {
                return response;
            },
        }),

 
    })
});


export const { useGetCategoryQuery, 
    useGetTagsQuery, 
    useGetTopPostQuery, 
    useGetBlogPostMutation, 
    useGetPostDetailQuery, 
    useGetRelatedPostQuery,
    useUserPostCommentMutation  } = BlogService;