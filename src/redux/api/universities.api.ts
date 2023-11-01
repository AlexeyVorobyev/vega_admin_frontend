import {api} from './api'
import {ESort, IUniversitiesPayload} from "./types/universities";


const constructUniversitiesQueryString = (config:IUniversitiesPayload):string => {
    let resString = '?'

    for (const key of Object.keys(config)) {
        if (key === 'sort') {
            const resSort:string[] = []

            for (const key in Object.keys(config.sort!)) {
                if (config.sort![key] === ESort.ascending) {
                    resSort.push(`${key},${ESort.ascending}`)
                }
                else if (config.sort![key] === ESort.descending) {
                    resSort.push(`${key},${ESort.descending}`)
                }
                else {
                    throw new Error('problems with sort enum in construction of query string')
                }
            }

            resString += `sort=${JSON.stringify(resSort)}&`
        }
        else {
            resString += `${key}=${config[key as keyof IUniversitiesPayload]}&`
        }
    }

    console.log('DEBUG QUERYPARAMS',resString)

    return resString === '?' ? '' : resString
}

export const universitiesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        universities: builder.query<any,IUniversitiesPayload>({
            query: (settings) => ({
                url:'/university' + constructUniversitiesQueryString(settings),
                method: 'GET',
                headers: {

                }
            }),
            providesTags:['tag1']
        }),
        templateMutation: builder.mutation({
            query: (settings:{id:number,body:never}) => ({
                url:`someUrl${settings.id}`,
                method: 'post',
                headers: {

                },
                body:settings.body
            }),
        })
    }),
    overrideExisting:false
})

export const {
    useLazyUniversitiesQuery
} = universitiesApi