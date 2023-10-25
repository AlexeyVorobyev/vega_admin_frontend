import {FC, ReactNode, useCallback, useState} from "react";
import {Collapse, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {Link, useLocation} from "react-router-dom";

interface IProps {
    name: string,
    path: string[],
    icon?: ReactNode
    children?: ReactNode
}

export const SideNavigationItem: FC<IProps> = ({
                                                   name,
                                                   path,
                                                   icon,
                                                   children
                                               }) => {

    const [open, setOpen] = useState<boolean>(false)
    const location = useLocation()

    const checkLocation = useCallback((): boolean => {
        return location.pathname === '/' + constructPathLink(path) || location.pathname === constructPathLink(path)
    }, [location])

    const handleClick = useCallback(() => {
        if (open) {
            if (checkLocation()) {
                setOpen(false)
            }
        } else {
            if (checkLocation()) {
                setOpen(true)
            }
        }
    }, [location])

    const constructPathLink = useCallback((path: string[]): string => {
        const formattedPathArr = ['', ...path]
        return formattedPathArr.reduce((resPath, currentValue, currentIndex) => resPath + currentValue + (currentIndex !== formattedPathArr.length - 1 ? '/' : ""))
    }, [path])

    return (
        <>
            <Link
                to={constructPathLink(path)}
                style={{textDecoration: 'none'}}>
                <ListItemButton onClick={handleClick} sx={{padding:1, paddingLeft:2, height:'48px'}}>
                    {icon && <ListItemIcon>
                        {icon}
                    </ListItemIcon>}
                    {name && <ListItemText disableTypography>
                        <Typography color={checkLocation() ? '#42a5f5' : '#000000'}>{name}</Typography>
                    </ListItemText>}
                    {children ? (open ? <ExpandLess color={'primary'}/> : <ExpandMore color={'primary'}/>) : null}
                </ListItemButton>
            </Link>
            {children && <Collapse in={open}>
                {children}
            </Collapse>}
        </>
    )
}
