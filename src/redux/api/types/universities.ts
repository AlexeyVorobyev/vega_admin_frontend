export enum EGrade {
    High = 'HIGH',
    Middle = 'MIDDLE'
}

export const parseEGradeToRusName = (str: `${EGrade}`): string => {
    switch (str) {
        case EGrade.High:
            return 'ВУЗ'
        case EGrade.Middle:
            return 'ССУЗ'
        default:
            return 'Другой'
    }
}

export enum ESort {
    ascending = 'ASC',
    descending = 'DESC'
}

export interface IUniversitiesPayload {
    titleFilter?: string
    gradeFilter?: `${EGrade}`
    page?: number
    size?: number
    sort?: {
        [key: string]: `${ESort}`
    }
}

export interface IUniversityEntity {
    id: string
    title: string
    shortTitle: string
    description: string
    address: string
    site: string
    town: {
        id: string
        title: string
    }
    grade: `${EGrade}`
    cardPhoto: string
    priority: number
    studentsTelegramChatUrl: string
}

export interface IUniversityPostPutPayload {
    title: string
    shortTitle: string
    description: string
    address: string
    site: string
    town: string
    grade: `${EGrade}`
    cardPhoto?: string
    priority: number
    studentsTelegramChatUrl?: string
}
