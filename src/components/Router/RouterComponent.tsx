import {FC, useCallback} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {IRoute, routesList} from "./routesList";

export const RouterComponent: FC = () => {

    const constructRoutes = useCallback((routesList: IRoute[]) => {
        return routesList.map((item) => {
            return (<Route path={item.path} element={item.component}>
                {item.routes && constructRoutes(item.routes)}
            </Route>)
        })
    }, [])

    return (
        <Routes>
            {constructRoutes(routesList)}
            <Route path={'*'} element={<Navigate to={'/'}/>}/>
        </Routes>
    )
}