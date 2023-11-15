import {ESort} from "./universities";

export enum EEducationLevel {
    middleProfession = 'MIDDLE_PROFESSION',
    middleSpeciality = 'MIDDLE_SPECIALITY',
    undergraduate = 'UNDERGRADUATE',
    speciality = 'SPECIALITY',
    master = 'MASTER',
    other = 'OTHER'
}

export const parseEEducationLevelToRusName = (str: `${EEducationLevel}`): string => {
    switch (str) {
        case EEducationLevel.middleProfession:
            return 'Профессия ССУЗА'
        case EEducationLevel.middleSpeciality:
            return 'Специальность ССУЗА'
        case EEducationLevel.undergraduate:
            return 'Школьный уровень'
        case EEducationLevel.speciality:
            return 'Специалитет'
        case EEducationLevel.master:
            return 'Магистратура'
        case EEducationLevel.other:
        default:
            return 'Другая'
    }
}

export interface ISpecialitiesPayload {
    titleFilter?: string,
    educationLevelFilter?: `${EEducationLevel}`
    page?: number,
    size?: number,
    sort?: {
        [key: string]: `${ESort}`
    }
}

export interface ISpecialityEntity {
    id: string
    title: string
    code: string
    description: string
    educationLevel: `${EEducationLevel}`
}

export interface ISpecialityPostPutPayload {
    title: string
    code: string
    description: string
    //direction: ?????
}