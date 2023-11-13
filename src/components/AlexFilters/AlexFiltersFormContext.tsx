import React, {FC, ReactNode} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {theme} from "../Theme/theme";
import {Box, Button, Divider, Stack, Typography} from "@mui/material";

interface IProps {
    children: ReactNode
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>
}

export const AlexFiltersFormContext: FC<IProps> = ({
                                                       children,
                                                       setAnchorEl
                                                   }) => {

    const methods = useForm()
    const {handleSubmit,reset,} = methods

    const onSubmit = (data: any) => {
        console.log(data)
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{
                    padding: theme.spacing(2),
                    minWidth: '500px'
                }}>
                    <Stack direction={'column'} spacing={theme.spacing(2)}>
                        {children}
                    </Stack>
                    <Divider sx={{marginBottom: theme.spacing(2), marginTop: theme.spacing(2)}}/>
                    <Stack direction={'row'} spacing={theme.spacing(2)} justifyContent={'flex-end'}>
                        <Button variant={'outlined'} color={'neutral'}
                                onClick={() => {
                                    reset()
                                    setAnchorEl(null)
                                }}>
                            <Typography variant={'button'}
                                        color={theme.palette.neutral.notContrastText}>Очистить всё</Typography>
                        </Button>
                        <Button variant={'contained'} type={'submit'}>
                            <Typography variant={'button'}>Применить</Typography>
                        </Button>
                    </Stack>
                </Box>
            </form>
        </FormProvider>
    )
}