import React, {FC, useState} from 'react'
import {Button, IconButton, Paper, Popover, Stack, Typography} from '@mui/material'
import {LinkRouterWrapper} from '../../LinkRouterWrapper/LinkRouterWrapper'
import {theme} from '../../Theme/theme'
import CloseIcon from '@mui/icons-material/Close'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

const UserPanel:FC = () => {

    const [openButtonPopover, setOpenButtonPopover] = useState<boolean>(false)
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
        setOpenButtonPopover(!openButtonPopover)
    }

    return (
        <Stack direction={'row'} alignItems={'center'} spacing={1}>
            <LinkRouterWrapper to={'/cabinet'}>
                <IconButton>
                    <AccountCircleIcon style={{color:theme.palette.primary.contrastText}}/>
                </IconButton>
            </LinkRouterWrapper>
            <LinkRouterWrapper to={'/cabinet'}>
                <Typography variant={'subtitle1'} sx={{cursor: 'pointer'}} color={theme.palette.primary.contrastText}>Личный кабинет</Typography>
            </LinkRouterWrapper>
            <IconButton onClick={handleClick}>
                <CloseIcon style={{color:theme.palette.primary.contrastText}}/>
            </IconButton>
            <Popover
                open={openButtonPopover}
                anchorEl={anchorEl}
                sx={{
                    zIndex: 100000
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
            >
                <Paper elevation={3} sx={{padding: '10px'}}>
                    <Stack direction={'column'} spacing={1}>
                        <Typography>Выйти из аккаунта?</Typography>
                        <Stack direction={'row'} spacing={'10px'}>
                            <Button size={'large'}
                                    onClick={() => {
                                        localStorage.clear()
                                        location.reload()
                                    }}
                                    variant="contained">
                                Да
                            </Button>
                            <Button size={'large'}
                                    onClick={() => setOpenButtonPopover(false)}
                                    variant="contained">
                                Нет
                            </Button>
                        </Stack>
                    </Stack>
                </Paper>
            </Popover>
        </Stack>
    )
}

export default UserPanel