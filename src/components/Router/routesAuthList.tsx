import {IRoute} from './routesList'
import {AuthPage} from '../pages/AuthPage/AuthPage'
import {Navigate} from 'react-router-dom'

export const routesAuthList: IRoute[] = [
    {
        path: '/',
        name: 'Базовая страница',
        component: <AuthPage/>
    },

    {
        path: '*',
        name: 'Пересылка',
        component: <Navigate to={'/'}/>
    },
]