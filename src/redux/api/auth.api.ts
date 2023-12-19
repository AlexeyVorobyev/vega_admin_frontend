import {api} from './api'
import {
    LoginPayload,
    LoginResponse,
} from "./types/auth";
export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        auth: builder.mutation<any,LoginPayload>({
            query: (body) => ({
                url:`/auth`,
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body
            }),
            transformResponse(apiResponse, meta) {
                return {
                    apiResponse,
                    authorization: meta?.response?.headers.get('authorization')
                }
            }
        }),
        me: builder.query<any,any>({
            query: () => ({
                url:`/me`,
                method: 'POST',
            }),
        })
    }),
    overrideExisting:false
})

export const {
    useAuthMutation,
    useMeQuery
} = authApi