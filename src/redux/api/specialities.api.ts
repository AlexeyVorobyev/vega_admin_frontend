import {api, constructQueryString} from './api'
import {ISpecialitiesPayload, ISpecialityPostPutPayload} from "./types/specialities";

export const specialitiesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        specialities: builder.query<any, ISpecialitiesPayload>({
            query: (settings) => ({
                url: '/speciality' + constructQueryString(settings),
                method: 'GET',
            }),
            providesTags: ['specialities']
        }),
        speciality: builder.query<any, { id: string }>({
            query: (settings) => ({
                url: `/speciality/${settings.id}`,
                method: 'GET',
            }),
            providesTags: ['specialities']
        }),
        specialityDelete: builder.mutation<any, { id: string }>({
            query: (settings) => ({
                url: `/speciality/${settings.id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['specialities']
        }),
        specialityPost: builder.mutation<any, { body: ISpecialityPostPutPayload }>({
            query: (settings) => ({
                url: `/speciality`,
                method: 'POST',
                body: settings.body
            }),
            invalidatesTags: ['specialities']
        }),
        specialityPut: builder.mutation<any, { id: string, body: ISpecialityPostPutPayload }>({
            query: (settings) => ({
                url: `/speciality/${settings.id}`,
                method: 'PUT',
                body: settings.body
            }),
            invalidatesTags: ['specialities']
        }),
    }),
    overrideExisting: false
})

export const {
    useLazySpecialitiesQuery,
    useSpecialityDeleteMutation,
    useSpecialityQuery,
    useLazySpecialityQuery,
    useSpecialityPostMutation,
    useSpecialityPutMutation
} = specialitiesApi