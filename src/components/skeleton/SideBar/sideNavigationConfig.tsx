import {ReactNode} from "react";
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import SettingsIcon from '@mui/icons-material/Settings';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import QuizIcon from '@mui/icons-material/Quiz';
import PersonIcon from '@mui/icons-material/Person';

export interface ISideNavigationConfig {
    path: string | null,
    name: string
    icon?: ReactNode
    routes?: ISideNavigationConfig[]
}


export const sideNavigationConfig: ISideNavigationConfig[] = [
    {path: '/', name: 'Статистика', icon: <QueryStatsIcon/>},

    // {path:'/tutors', name:'Репетиторы', component:<p>xyz</p>},
    //
    // {path:'/universities', name:'ВУЗЫ', component:null},
    //
    // {path:'/colleges', name:'ССУЗЫ', component:null},
    //
    // {path:'/tests', name:'Тесты', component:null},

    {
        path: null, name: 'Настройки', icon: <SettingsIcon/>,
        routes: [
            {path: 'customization/tutors', name: 'Настройка репетиторов', icon: <PersonIcon/>},

            {path: 'customization/universities', name: 'Настройка учебных заведений', icon: <SchoolOutlinedIcon/>},

            {path: 'customization/tests', name: 'Настройка тестов', icon: <QuizIcon/>}
        ]
    },
]