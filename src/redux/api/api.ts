import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const disabledAuthTokenEndpoints = [
    'auth',
]
export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['tag1', 'tag2', 'universities'],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_APP_API_HOST,
        prepareHeaders: (headers, api) => {
            if (disabledAuthTokenEndpoints.includes(api.endpoint)) {
                return headers
            }
            headers.set('Authorization', `testdatabase`)
            return headers
        }
    }),
    endpoints: () => ({})
})
