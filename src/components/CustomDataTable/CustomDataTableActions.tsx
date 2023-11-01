import React, {FC, useState} from "react";
import {IActionsConfig, ICustomDataTableRow} from "./CustomDataTable";
import {IconButton, Popover, Typography} from "@mui/material";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

interface IProps {
    actionsConfig: IActionsConfig
    row: ICustomDataTableRow
    handleRedirect: (id: string, path: string) => void
    setPreventEvent: any
}

export const CustomDataTableActions: FC<IProps> = ({
                                                       actionsConfig,
                                                       row,
                                                       handleRedirect,
                                                       setPreventEvent
                                                   }) => {

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        setPreventEvent(true)
        setAnchorEl(event.currentTarget)
        setTimeout(() => {
            setPreventEvent(false)
        },300)
    };

    const handleClose = () => {
        setAnchorEl(null)
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined

    return (
        <>
            <IconButton aria-describedby={id} onClick={handleClick}>
                <OpenInNewIcon/>
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Typography sx={{p: 2}}>The content of the Popover.</Typography>
            </Popover>
        </>
    )
}