import {ReactNode} from "react";
import {TutorsTablePage} from "../pages/TutorsTablePage/TutorsTablePage";
import {UniversitiesTable} from "../pages/UniversitiesTablePage/UniversitiesTable";
import {CustomizationWrapperPage, EPageType} from "../pages/СustomizationWrapperPage/СustomizationWrapperPage";
import {UniversitiesCard} from "../pages/UniversitiesTablePage/UniversitiesCard";

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
        path: 'customization/universities', name: 'Настройка учебных заведений',
        component: (
            <CustomizationWrapperPage namespace={'universities'}>
                <UniversitiesTable/>
            </CustomizationWrapperPage>
        )
    },
    {
        path: `customization/universities/${EPageType.view}`, name: 'Учебное заведение',
        component: (
            <CustomizationWrapperPage namespace={'universities'}>
                <UniversitiesCard/>
            </CustomizationWrapperPage>
        )
    },
    {
        path: `customization/universities/${EPageType.edit}`, name: 'Настройка учебного заведения',
        component: (
            <CustomizationWrapperPage namespace={'universities'}>
                {null}
            </CustomizationWrapperPage>
        )
    },
    {
        path: `customization/universities/${EPageType.add}`, name: 'Создание учебного заведения',
        component: (
            <CustomizationWrapperPage namespace={'universities'}>
                {null}
            </CustomizationWrapperPage>
        )
    },

    {path: 'customization/tests', name: 'Настройка тестов', component: null}
]

const mapRoutesList = (routesList: IRoute[]): [string, string][] => {
    const resultArr: [string, string][] = []

    routesList.map((item) => {
        resultArr.push([item.path, item.name])
        if (item.routes) {
            resultArr.push(...mapRoutesList(item.routes))
        }
    })

    return resultArr
}
export const autoGeneratedRoutesListMap = new Map(mapRoutesList(routesList))