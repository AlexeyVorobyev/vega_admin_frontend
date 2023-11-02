import React, {FC, useState} from "react";
import {IActionsConfig, ICustomDataTableRow} from "./CustomDataTable";
import {Button, IconButton, Popover, Stack, Typography} from "@mui/material";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {theme} from "../Theme/theme";
import {useNavigate} from "react-router-dom";

interface IProps {
    actionsConfig: IActionsConfig
    row: ICustomDataTableRow
}

export const CustomDataTableActions: FC<IProps> = ({
                                                       actionsConfig,
                                                       row,
                                                   }) => {

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        setAnchorEl(event.currentTarget)
    };

    const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        setAnchorEl(null)
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined
    const navigate = useNavigate()

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
                <Stack direction={'column'} spacing={theme.spacing(1)} padding={theme.spacing(2)}>
                    {actionsConfig.view &&
                        (<Button
                            variant={'text'}
                            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                                event.stopPropagation()
                                navigate(`${actionsConfig?.view?.path!}?id=${row.get(actionsConfig!.view!.columnName)}`)
                            }}>
                            <Typography variant={'button'} color={theme.palette.text.primary}>Просмотр</Typography>
                        </Button>)}
                    {actionsConfig.edit &&
                        (<Button
                            variant={'text'}
                            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                                event.stopPropagation()
                                navigate(`${actionsConfig?.edit?.path!}?id=${row.get(actionsConfig!.view!.columnName)}`)
                            }}>
                            <Typography variant={'button'} color={theme.palette.text.primary}>Редактировать</Typography>
                        </Button>)}
                    {/*<Button variant={'text'}>*/}
                    {/*    <Typography variant={'button'} color={theme.palette.text.primary}>Удалить</Typography>*/}
                    {/*</Button>*/}
                </Stack>
            </Popover>
        </>
    )
}