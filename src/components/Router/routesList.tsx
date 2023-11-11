import {ReactNode} from "react";
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

    {
        path: 'customization/tests',
        name: 'Настройка тестов',
        component: <Navigate to={`/customization/tests/${EPageType.table}`}/>
    },
    {
        path: `customization/tests/${EPageType.table}`,
        name: 'Таблица тестов',
        component: <CustomizationPage/>
    },
    {
        path: `customization/tests/${EPageType.view}`,
        name: 'Тест',
        component: <CustomizationPage/>
    },
    {
        path: `customization/tests/${EPageType.edit}`,
        name: 'Настройка теста',
        component: <CustomizationPage/>
    },
    {
        path: `customization/tests/${EPageType.add}`,
        name: 'Добавление теста',
        component: <CustomizationPage/>
    },

    {
        path: 'customization/users',
        name: 'Настройка пользователей',
        component: <Navigate to={`/customization/users/${EPageType.table}`}/>
    },
    {
        path: `customization/users/${EPageType.table}`,
        name: 'Таблица пользователей',
        component: <CustomizationPage/>
    },
    {
        path: `customization/users/${EPageType.view}`,
        name: 'Пользователь',
        component: <CustomizationPage/>
    },
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