import {FC, useCallback} from "react";
import {Route, Routes} from "react-router-dom";
import {IRoute} from "./routesList";
import {NotExistPage} from "../pages/NotExistPage/NotExistPage";

export const RouterComponent: FC<{ routesList: IRoute[] }> = ({routesList}) => {

    const constructRoutes = useCallback((routesList: IRoute[]) => {
        return routesList.map((item) => {
            return (<Route path={item.path} element={item.component} key={item.path}>
                {item.routes && constructRoutes(item.routes)}
            </Route>)
        })
    }, [routesList])

    return (
        <Routes>
            {constructRoutes(routesList)}
            {/*<Route path={'*'} element={<NotExistPage/>}/>*/}
        </Routes>
    )
}