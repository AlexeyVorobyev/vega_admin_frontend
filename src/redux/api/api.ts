import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IUniversitiesPayload} from "./types/universities";
import {getTokens} from '../../components/functions/getAuthToken'
import CONFIG from '../../globalConfig'

const disabledAuthTokenEndpoints = [
    'auth',
]
export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['universities', 'towns', 'users','specialities'],
    baseQuery: fetchBaseQuery({
        baseUrl: CONFIG.api_host,
        prepareHeaders: (headers, api) => {
            if (disabledAuthTokenEndpoints.includes(api.endpoint)) {
                return headers
            }
            headers.set('Authorization', getTokens().authorization || "")
            return headers
        }
    }),
    endpoints: () => ({})
})

export const constructQueryString = (config: IUniversitiesPayload): string => {
    let resString = '?'

    for (const key of Object.keys(config)) {
        resString += `${key}=${config[key as keyof IUniversitiesPayload]}&`
    }

    console.log('DEBUG QUERYPARAMS', resString)

    return resString === '?' ? '' : resString
}