import {ESort} from "./universities";

export enum EUserRole {
    student = 'STUDENT',
    tutor = 'TUTOR',
    service = 'SERVICE',
    admin = 'ADMIN'
}

export const parseEUserRoleToRusName = (str: `${EUserRole}`): string => {
    switch (str) {
        case EUserRole.student:
            return 'Студент'
        case EUserRole.tutor:
            return 'Репетитор'
        case EUserRole.service:
            return 'Модератор'
        case EUserRole.admin:
            return 'Админ'
        default:
            return 'Другой'
    }
}

export interface IUserEntity {
    id: string
    telegramId: number
    userRole: `${EUserRole}`
    surname: string
    forename: string
    username: string
}

export interface IUsersPayload {
    roleFilter?: `${EUserRole}`
    page?: number
    size?: number
    sort?: {
        [key: string]: `${ESort}`
    }
}