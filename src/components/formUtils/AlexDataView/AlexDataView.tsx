import {FC, ReactNode} from "react";
import {Stack, Typography} from "@mui/material";
import {theme} from "../../Theme/theme";

interface IProps {
    label: string
    children: ReactNode
}

export const AlexDataView: FC<IProps> = ({
                                             label,
                                             children
                                         }) => {
    return (
        <Stack direction={'column'} spacing={theme.spacing(1)}>
            <Typography variant={'h6'}>{label}</Typography>
            {typeof children === 'string'
                ? <Typography variant={'body1'}>{children ? children : 'Нет данных'}</Typography>
                : children ? children : <Typography variant={'body1'}>Нет данных</Typography>}
        </Stack>
    )
}