import {FC, useCallback} from "react";
import {Box, List} from "@mui/material";
import {IRoute, routesList} from "../../Router/routesList";
import {SideNavigationItem} from "./SideNavigationItem";

export const SideNavigation: FC = () => {

    const constructSideNavigation = useCallback((routesList: IRoute[], baseRoute:string[]) => {
        return routesList.map((item) => {
            if (item.routes) {
                return (<SideNavigationItem key={item.name} name={item.name} path={[...baseRoute,item.path]} icon={item.icon}>
                    {constructSideNavigation(item.routes,[...baseRoute,item.path])}
                </SideNavigationItem>)
            } else {
                return <SideNavigationItem key={item.name} name={item.name} path={[...baseRoute,item.path]} icon={item.icon}/>
            }
        })
    }, [routesList])

    return (
        <Box width={'400px'} sx={{boxShadow: 2}}>
            <List sx={{padding:'0'}}>
                {constructSideNavigation(routesList,[])}
            </List>
        </Box>
    )
}