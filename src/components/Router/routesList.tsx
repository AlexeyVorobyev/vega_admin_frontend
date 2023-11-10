import {ReactNode} from "react";
import {TutorsTablePage} from "../pages/TutorsTablePage/TutorsTablePage";
import {CustomizationPage, EPageType} from "../pages/СustomizationPage/СustomizationPage";
import {Navigate} from "react-router-dom";

export interface IRoute {
    path: string,
    name: string
    component: ReactNode
    routes?: IRoute[]
}


export const routesList: IRoute[] = [
    {path: '/', name: 'Статистика', component: null},

    {path: 'customization/tutors', name: 'Настройка репетиторов', component: <TutorsTablePage/>},

    {
        path: `customization/universities`,
        name: 'Учебные заведения',
        component: <Navigate to={`/customization/universities/${EPageType.table}`}/>
    },
    {
        path: `customization/universities/${EPageType.table}`,
        name: 'Таблица учебных заведений',
        component: <CustomizationPage/>
    },
    {
        path: `customization/universities/${EPageType.view}`,
        name: 'Учебное заведение',
        component: <CustomizationPage/>
    },
    {
        path: `customization/universities/${EPageType.edit}`,
        name: 'Настройка учебного заведения',
        component: <CustomizationPage/>
    },
    {
        path: `customization/universities/${EPageType.add}`,
        name: 'Добавление учебного заведения',
        component: <CustomizationPage/>
    },

    {path: 'customization/tests', name: 'Настройка тестов', component: null}
]

const mapRoutesListPaths = (routesList: IRoute[]): string[] => {
    const resultArr: string[] = []

    routesList.map((item) => {
        resultArr.push(item.path)
        if (item.routes) {
            resultArr.push(...mapRoutesListPaths(item.routes))
        }
    })

    return resultArr
}

const mapRoutesListNames = (routesList: IRoute[]): [string, string][] => {
    const resultArr: [string, string][] = []

    routesList.map((item) => {
        resultArr.push([item.path, item.name])
        if (item.routes) {
            resultArr.push(...mapRoutesListNames(item.routes))
        }
    })

    return resultArr
}
export const autoGeneratedRoutesListMap = new Map(mapRoutesListNames(routesList))
export const autoGeneratedAllowedLinks = mapRoutesListPaths(routesList)