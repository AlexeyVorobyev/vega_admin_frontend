import {FC} from "react";
import {Stack} from "@mui/material";
import {theme} from "../Theme/theme";

interface IProps {
    simpleFilter:boolean
}

export const CustomDataTableHeader:FC<IProps> = ({simpleFilter}) => {
    return (
        <Stack direction={'row'} justifyContent={'end'} spacing={theme.spacing(2)}>

        </Stack>
    )
}