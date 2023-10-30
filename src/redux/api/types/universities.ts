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