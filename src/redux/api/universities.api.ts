import {api, constructQueryString} from './api'
import {IUniversitiesPayload, IUniversityPostPayload} from "./types/universities";

export const universitiesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        universities: builder.query<any, IUniversitiesPayload>({
            query: (settings) => ({
                url: '/university' + constructQueryString(settings),
                method: 'GET',
            }),
            providesTags: ['universities']
        }),
        university: builder.query<any, { id: string }>({
            query: (settings) => ({
                url: `/university/${settings.id}`,
                method: 'GET',
            }),
            providesTags: ['universities']
        }),
        universityDelete: builder.mutation<any, { id: string }>({
            query: (settings) => ({
                url: `/university/${settings.id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['universities']
        }),
        universityPost: builder.mutation<any, IUniversityPostPayload>({
            query: (settings) => ({
                url: `/university`,
                method: 'POST',
                body:settings
            }),
            invalidatesTags: ['universities']
        }),
    }),
    overrideExisting: false
})

export const {
    useLazyUniversitiesQuery,
    useUniversityDeleteMutation,
    useUniversityQuery,
    useLazyUniversityQuery,
    useUniversityPostMutation
} = universitiesApi