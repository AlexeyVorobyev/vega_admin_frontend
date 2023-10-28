import {FC, ReactNode} from "react";
import {Paper, Stack} from "@mui/material";
import {theme} from "../Theme/theme";
import {CustomBreadCrumbs} from "./BreadCrumbs/CustomBreadCrumbs";

interface IProps {
    children?: ReactNode
}

export const PageWrapper: FC<IProps> = ({
                                            children
                                        }) => {

    return (
        <Stack
            spacing={2}
            sx={{
                width: '100%',
                height: '100%',
                padding: theme.spacing(3),
                boxSizing: 'border-box'
            }}>
            <CustomBreadCrumbs/>
            <Paper
                elevation={2}
                sx={{
                    height: '100%'
                }}>
                {children}
            </Paper>
        </Stack>
    )
}