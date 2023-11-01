import {FC, useLayoutEffect, useMemo, useState} from "react";
import {FormControl, MenuItem, Pagination, Stack, TextField, Typography} from "@mui/material";
import {theme} from "../Theme/theme";
import {useSearchParams} from "react-router-dom";

interface IProps {
    availablePages: number,
}

export const CustomDataTableFooter: FC<IProps> = ({availablePages}) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [page, setPage] = useState<string | null>(searchParams.get('page') || null);
    const [perPage, setPerPage] = useState<string | null>(searchParams.get('perPage') || null)
    const options = ['1', '2', '4', '8', '16', '32']
    const savedPages = useMemo(() => availablePages,[searchParams,page,perPage])

    useLayoutEffect(() => {
        if (!page) {
            setPage(searchParams.get('page'))
        }
        if (!perPage) {
            setPerPage(searchParams.get('perPage'))
        }
    }, [searchParams])

    useLayoutEffect(() => {
        page && searchParams.get('page') && setSearchParams(new URLSearchParams([
            ['page', page],
            ...Array.from(searchParams.entries()).filter((item) => item[0] !== 'page'),
        ]))
    }, [page])

    useLayoutEffect(() => {
        perPage && searchParams.get('perPage') && setSearchParams(new URLSearchParams([
            ['perPage', perPage],
            ...Array.from(searchParams.entries()).filter((item) => item[0] !== 'perPage'),
        ]))
    }, [perPage])

    useLayoutEffect(() => {
        setSearchParams(new URLSearchParams([
            ...Array.from(searchParams.entries()),
            !searchParams.get('perPage') ? ['perPage', '8'] : [],
            !searchParams.get('page') ? ['page', '0'] : [],
        ].filter((item) => item.length)))
    }, [searchParams])

    return (
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}
               sx={{padding: theme.spacing(2)}}>
            <Stack direction={'row'} alignItems={'center'} spacing={theme.spacing(2)}>
                <Typography variant={'subtitle2'} color={theme.palette.text.primary} noWrap minWidth={160}>Количество
                    элементов:</Typography>
                <FormControl>
                    <TextField
                        value={perPage}
                        onChange={(event) => setPerPage(event.target.value)}
                        select
                    >
                        {options.map((option) => <MenuItem key={option.toString()}
                                                           value={option.toString()}>{option.toString()}</MenuItem>)}
                    </TextField>
                </FormControl>
            </Stack>
            <Pagination count={savedPages || availablePages || 10} page={Number(page) + 1}
                // @ts-ignore
                        onChange={(event: any, value) => setPage((value - 1).toString())}/>
        </Stack>
    )
}