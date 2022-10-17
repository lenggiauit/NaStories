import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ApiRequest, ApiResponse, AppSetting } from "../types/type";
import { getLoggedUser } from '../utils/functions'; 
 
import { YoutubeVideoResource } from './resources/youtubeVideoResource';
 
 
 
let appSetting: AppSetting = require('../appSetting.json');

export const HomeService = createApi({
    reducerPath: 'HomeService',

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
        GetYoutubevideos: builder.query<ApiResponse<YoutubeVideoResource[]>, null>({
            query: () => ({
                url: 'home/getYoutubevideos',
                method: 'GET'
            }),
            transformResponse(response: ApiResponse<YoutubeVideoResource[]>) {
                return response;
            },
        }),
        
 
    })
});


export const {  useGetYoutubevideosQuery   } = HomeService;