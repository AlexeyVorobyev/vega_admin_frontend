export enum EGrade {
    High = 'HIGH',
    Middle = 'MIDDLE'
}

export enum ESort {
    ascending = 'ASC',
    descending = 'DESC'
}

export interface IUniversitiesPayload {
    titleFilter?: string,
    gradeFilter?: EGrade.High | EGrade.Middle,
    page?: number,
    size?: number,
    sort?: {
        [key: string]: ESort.ascending | ESort.descending
    }
}

export interface IUniversityEntity {
    id: string;
    title: string;
    shortTitle: string;
    description: string;
    address: string;
    site: string;
    town: {
        id: string;
        title: string;
    };
    grade: string;
    cardPhoto: string;
    priority: number;
    studentsTelegramChatUrl: string;
}

export interface IUniversityPostPutPayload {
    title: string
    shortTitle: string
    description: string
    address: string
    site: string
    town: string
    grade: EGrade.High | EGrade.Middle
    cardPhoto?: string
    priority: number
    studentsTelegramChatUrl?: string
}
