import {FC, ReactNode, useCallback, useMemo, useState} from "react";
import {Collapse, ListItemButton, ListItemIcon, ListItemText, Tooltip, Typography} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {Link, useLocation} from "react-router-dom";
import {theme} from "../../Theme/theme";
import {constructPathLink} from "../../functions/constructPathLink";
import {checkLocation} from "../../functions/checkLocation";

interface IProps {
    name: string,
    path: string[],
    icon?: ReactNode
    isContracted: boolean
    children?: ReactNode
}

export const SideNavigationItem: FC<IProps> = ({
                                                   name,
                                                   path,
                                                   icon,
                                                   isContracted,
                                                   children
                                               }) => {

    const [open, setOpen] = useState<boolean>(false)
    const location = useLocation()

    const constructedPathLink = useMemo(() => constructPathLink(path), [path])

    const isCurrentLocation = useMemo(() => checkLocation(location.pathname, constructedPathLink), [location, constructedPathLink])

    const handleClick = useCallback(() => {
        if (open) {
            if (isCurrentLocation) {
                setOpen(false)
            }
        } else {
            setOpen(true)
        }
    }, [location])


    return (
        <>
            <Link
                to={constructedPathLink}
                style={{textDecoration: 'none'}}>
                <ListItemButton onClick={handleClick}
                                sx={{padding: theme.spacing(1), paddingLeft: theme.spacing(2), height: '48px'}}>
                    {icon &&
                        <Tooltip title={isContracted ? name : null}>
                            <ListItemIcon
                                sx={{color: !(isContracted && isCurrentLocation) ? undefined : theme.palette.secondary.main}}>
                                {icon}
                            </ListItemIcon>
                        </Tooltip>}
                    {name &&
                        <ListItemText
                            disableTypography
                            sx={{
                                transform: isCurrentLocation ? `translate(-${theme.spacing(1)})` : undefined,
                                transition: 'all 1s',
                                opacity: isContracted ? '0' : '1',
                            }}>
                            <Typography
                                color={isCurrentLocation ? theme.palette.secondary.main : '#000000'}>{name}</Typography>
                        </ListItemText>}
                    {children && !isContracted ? (open ? <ExpandLess color={'secondary'}/> :
                        <ExpandMore color={'secondary'}/>) : null}
                </ListItemButton>
            </Link>
            {children && <Collapse in={open}>
                {children}
            </Collapse>}
        </>
    )
}
