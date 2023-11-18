import {api, constructQueryString} from './api'
import {IUsersPayload} from "./types/users";
export const usersApi = api.injectEndpoints({
    endpoints: ({mutation, query}) => ({
        users: query<any, IUsersPayload>({
            query: (settings) => ({
                url: '/user' + constructQueryString(settings),
                method: 'GET',
            }),
            providesTags: ['users']
        }),
        user: query<any, { id: string }>({
            query: (settings) => ({
                url: `/user/${settings.id}`,
                method: 'GET',
            }),
            providesTags: ['users']
        }),
        userDelete: mutation<any, { id: string }>({
            query: (settings) => ({
                url: `/user/${settings.id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['users']
        }),
    }),
    overrideExisting: false
})

export const {
    useLazyUsersQuery,
    useUserQuery
} = usersApi