import {FC, useCallback, useMemo} from "react";
import {Link, useLocation} from "react-router-dom";
import {Breadcrumbs, Typography} from "@mui/material";
import {constructPathLink} from "../../functions/constructPathLink";
import {theme} from "../../Theme/theme";
import {checkLocation} from "../../functions/checkLocation";
import {customBreadCrumbsNameMap} from "./customBreadCrumbsNameMap";

interface IBreadCrumbConfig {
    linkTo:string,
    name:string
}

export const CustomBreadCrumbs: FC = () => {

    const location = useLocation()

    const pathArr = useMemo(() => location.pathname.split('/').filter((item) => item !== ''),[location])

    const constructBreadCrumbs = useCallback(() => {

        const breadCrumbsConfig:IBreadCrumbConfig[] = []

        for (let i = 1; i <= pathArr.length; i++) {
            const slicedArr = pathArr.slice(0,i)
            const name = slicedArr[slicedArr.length - 1]
            breadCrumbsConfig.push({
                name: customBreadCrumbsNameMap.get(name) || name,
                linkTo: constructPathLink(slicedArr)
            })
        }

        console.log(breadCrumbsConfig)

        return breadCrumbsConfig.map((item) => <Link
            key={item.linkTo}
            to={item.linkTo}
            style={{textDecoration: 'none'}}>
            <Typography variant={'subtitle2'} color={checkLocation(location.pathname, item.linkTo) ? theme.palette.secondary.main : '#000000'} height={'24px'}>{item.name}</Typography>
        </Link>)
    }, [pathArr])

    return (
        <Breadcrumbs>
            <Link
                to={'/'}
                key={'/'}
                style={{textDecoration: 'none'}}>
                <Typography variant={'subtitle2'} color={checkLocation(location.pathname, '/') ? theme.palette.secondary.main : '#000000'} height={'24px'}>VEGA</Typography>
            </Link>
            {constructBreadCrumbs()}
        </Breadcrumbs>
    )
}