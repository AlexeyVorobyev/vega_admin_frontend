import React, {FC, ReactNode} from "react";
import {Dialog, DialogTitle} from "@mui/material";

interface IProps {
    title: string | ReactNode
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    children: ReactNode
}

export const CustomDialog: FC<IProps> = ({
                                             title,
                                             children,
                                             open,
                                             setOpen
                                         }) => {

    return (
        <Dialog open={open}
                onClick={(event: any) => {
                    event.stopPropagation()
                    if (event.nativeEvent.target.classList.contains("MuiDialog-container")) {
                        setOpen(false)
                    }
                }}>
            {typeof title === 'string' ?
                <DialogTitle sx={{textAlign:'center'}}>{title}</DialogTitle>
                : title}
            {children}
        </Dialog>
    )
}