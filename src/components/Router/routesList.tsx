import {ReactNode} from "react";
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import SettingsIcon from '@mui/icons-material/Settings';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import QuizIcon from '@mui/icons-material/Quiz';
import PersonIcon from '@mui/icons-material/Person';
export interface IRoute {
    path: string,
    name: string
    component: ReactNode
    icon?: ReactNode
    routes?:IRoute[]
}


export const routesList: IRoute[] = [
    {path: '/', name: 'Статистика', icon: <QueryStatsIcon/>, component: null},

    // {path:'/tutors', name:'Репетиторы', component:null},
    //
    // {path:'/universities', name:'ВУЗЫ', component:null},
    //
    // {path:'/colleges', name:'ССУЗЫ', component:null},
    //
    // {path:'/tests', name:'Тесты', component:null},

    {path: 'customization', name: 'Настройки', icon: <SettingsIcon/>, component: null,
        routes:[
            {path: 'tutors', name: 'Настройка репетиторов', icon: <PersonIcon/>, component: null},

            {path: 'universities', name: 'Настройка ВУЗОВ', icon: <SchoolOutlinedIcon/>, component: null},

            {path: 'colleges', name: 'Настройка ССУЗОВ', icon: <SchoolOutlinedIcon/>, component: null},

            {path: 'tests', name: 'Настройка тестов', icon: <QuizIcon/>, component: null}
        ]},
]