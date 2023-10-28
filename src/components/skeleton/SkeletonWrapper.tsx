import {FC, ReactNode} from "react";
import {Box, Stack, Typography} from "@mui/material";
import {SideNavigation} from "./SideBar/SideNavigation";
import {theme} from "../Theme/theme";
import {PageWrapper} from "./PageWrapper";

interface IProps {
    children:ReactNode
}

export const SkeletonWrapper:FC<IProps> = ({children}) => {

    return (
        <Box width={'100%'} height={'100%'}>
            <Box height={'70px'} sx={{
                background:theme.palette.primary.main,
                boxSizing:'border-box',
                padding:theme.spacing(2),
                boxShadow: 2
            }}>
                <Stack alignItems={'center'} direction={'row'} height={'100%'}>
                    <Typography variant={'h3'} color={theme.palette.primary.contrastText}>VEGA</Typography>
                </Stack>
            </Box>
            <Stack height={'calc(100vh - 70px)'} width={'100%'} direction={'row'}>
                <SideNavigation/>
                <Box sx={{flex:'1', height:'100%'}}>
                    <PageWrapper>
                        {children}
                    </PageWrapper>
                </Box>
            </Stack>
        </Box>
    )
}

