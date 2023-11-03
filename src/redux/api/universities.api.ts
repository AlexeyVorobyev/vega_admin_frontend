import {api} from './api'
import {IUniversitiesPayload} from "./types/universities";


const constructUniversitiesQueryString = (config: IUniversitiesPayload): string => {
    let resString = '?'

    for (const key of Object.keys(config)) {
        resString += `${key}=${config[key as keyof IUniversitiesPayload]}&`
    }

    console.log('DEBUG QUERYPARAMS', resString)

    return resString === '?' ? '' : resString
}

export const universitiesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        universities: builder.query<any, IUniversitiesPayload>({
            query: (settings) => ({
                url: '/university' + constructUniversitiesQueryString(settings),
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
        templateMutation: builder.mutation({
            query: (settings: { id: number, body: never }) => ({
                url: `someUrl${settings.id}`,
                method: 'post',
                headers: {},
                body: settings.body
            }),
        })
    }),
    overrideExisting: false
})

export const {
    useLazyUniversitiesQuery,
    useUniversityDeleteMutation
} = universitiesApi