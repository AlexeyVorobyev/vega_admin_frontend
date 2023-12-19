import {EUserRole} from './users'

export interface LoginResponse {
    response: {
        accessToken: string,
        refreshToken: string,
        expiry: number // timeStamp
    },
    messages: any[],
    code: 0 | 1 | 2 | 3
}

export interface LoginPayload {
    username: string,
    password: string
}

export type TMeEntity = {
    id: string,
    telegramId: number,
    userRole: EUserRole,
    surname: string,
    forename: string,
    username: string
}