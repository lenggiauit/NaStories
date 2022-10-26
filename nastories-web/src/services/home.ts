import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ApiRequest, ApiResponse, AppSetting } from "../types/type";
import { ResultCode } from '../utils/enums';
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
         
        SendContact:  builder.mutation<ApiResponse<ResultCode>, ApiRequest<{yourName: any, yourEmail: any, yourMessage: any}>>({
            query: (payload) => ({
                url: 'contact/SendContact',
                method: 'POST',
                body: payload
            }),
            transformResponse(response: ApiResponse<ResultCode>) {
                return response;
            },
        }), 
 
    })
});


export const {  useGetYoutubevideosQuery, useSendContactMutation   } = HomeService;