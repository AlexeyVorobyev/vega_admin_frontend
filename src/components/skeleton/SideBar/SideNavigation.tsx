import {FC, useCallback, useState} from "react";
import {List, Stack, Switch, Tooltip} from "@mui/material";
import {IRoute, routesList} from "../../Router/routesList";
import {SideNavigationItem} from "./SideNavigationItem";

export const SideNavigation: FC = () => {

    const [isContracted, setIsContracted] = useState<boolean>(false)

    const calcSideNavigationItemDisplay = useCallback((item:IRoute) => {
        const res = item.routes?.map((_item) => _item.sideNavAppear).reduce((accumulator:number, currentValue) => {
            if (currentValue !== false) {
                return accumulator + 1
            }
            else {
                return accumulator
            }
        },0)
        return res
    },[])

    const constructSideNavigation = useCallback((routesList: IRoute[], baseRoute: string[]) => {
        return routesList.map((item) => {
            if (item.routes && calcSideNavigationItemDisplay(item)) {
                return (<SideNavigationItem key={item.name} name={item.name} path={[...baseRoute, item.path]}
                                            icon={item.icon} isContracted={isContracted}>
                    {constructSideNavigation(item.routes, [...baseRoute, item.path])}
                </SideNavigationItem>)
            } else if (item.sideNavAppear !== false || item.sideNavAppear === undefined) {
                return <SideNavigationItem key={item.name} name={item.name} path={[...baseRoute, item.path]}
                                           icon={item.icon} isContracted={isContracted}/>
            }
        })
    }, [routesList, isContracted])

    return (
        <Stack
            direction={'column'}
            justifyContent={'space-between'}
            sx={{
                width: isContracted ? '58px' : '400px',
                boxShadow: 2,
                transition: 'all 1s',
            }}
        >
            <List sx={{padding: '0', overflow: 'hidden'}}>
                {constructSideNavigation(routesList, [])}
            </List>
            <Tooltip title={isContracted ? 'Раскрыть меню' : 'Свернуть меню'}>
                <Switch checked={!isContracted} onChange={() => setIsContracted(!isContracted)} color={'secondary'}/>
            </Tooltip>
        </Stack>
    )
}