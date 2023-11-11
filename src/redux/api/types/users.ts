import {ESort} from "./universities";

export enum EUserRole {
    student = 'STUDENT',
    tutor = 'TUTOR',
    service = 'SERVICE',
    admin = 'ADMIN'
}

export interface IUserEntity {
    id: string
    telegramId: number,
    userRole: EUserRole.admin | EUserRole.service | EUserRole.student | EUserRole.tutor,
    surname: string,
    forename: string,
    username: string
}

export interface IUsersPayload {
    roleFilter?: EUserRole.admin | EUserRole.service | EUserRole.student | EUserRole.tutor,
    page?: number,
    size?: number,
    sort?: {
        [key: string]: ESort.ascending | ESort.descending
    }
}