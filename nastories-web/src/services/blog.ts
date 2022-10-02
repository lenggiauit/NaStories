import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ApiRequest, ApiResponse, AppSetting } from "../types/type";
import { getLoggedUser } from '../utils/functions'; 
import * as FormDataFile from "form-data";
import { Category } from './models/admin/category';
 
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
        GetCategory: builder.mutation<ApiResponse<Category[]>, ApiRequest<{ isArchived: boolean }>>({
            query: (payload) => ({
                url: 'blog/getCategory',
                method: 'post',
                body: payload
            }),
            transformResponse(response: ApiResponse<Category[]>) {
                return response;
            },
        }),
         

    })
});

export const { useGetCategoryMutation  } = BlogService;