import {FC, useCallback, useMemo} from "react";
import {Link, useLocation} from "react-router-dom";
import {Breadcrumbs, Typography} from "@mui/material";
import {constructPathLink} from "../../functions/constructPathLink";
import {theme} from "../../Theme/theme";
import {checkLocation} from "../../functions/checkLocation";
import {customBreadCrumbsNameMap} from "./customBreadCrumbsNameMap";
import {LinkRouterWrapper} from "../../LinkRouterWrapper/LinkRouterWrapper";

interface IBreadCrumbConfig {
    linkTo: string,
    name: string
}

export const CustomBreadCrumbs: FC = () => {

    const location = useLocation()

    const pathArr = useMemo(() => location.pathname.split('/').filter((item) => item !== ''), [location])

    const constructBreadCrumbs = useCallback(() => {

        const breadCrumbsConfig: IBreadCrumbConfig[] = []

        for (let i = 1; i <= pathArr.length; i++) {
            const slicedArr = pathArr.slice(0, i)
            const name = slicedArr[slicedArr.length - 1]
            breadCrumbsConfig.push({
                name: customBreadCrumbsNameMap.get(constructPathLink(slicedArr)) || name,
                linkTo: constructPathLink(slicedArr)
            })
        }

        return breadCrumbsConfig.map((item) => <LinkRouterWrapper
            key={item.linkTo}
            to={!forbiddenLinks.includes(item.linkTo) ? item.linkTo : null}>
            <Typography variant={'subtitle2'}
                        color={checkLocation(location.pathname, item.linkTo) ? theme.palette.secondary.main : '#000000'}
                        height={'24px'}>{item.name}</Typography>
        </LinkRouterWrapper>)
    }, [pathArr])

    return (
        <Breadcrumbs>
            <Link
                to={'/'}
                key={'/'}
                style={{textDecoration: 'none'}}>
                <Typography variant={'subtitle2'}
                            color={checkLocation(location.pathname, '/') ? theme.palette.secondary.main : '#000000'}
                            height={'24px'}>VEGA</Typography>
            </Link>
            {constructBreadCrumbs()}
        </Breadcrumbs>
    )
}

const forbiddenLinks = ['customization']