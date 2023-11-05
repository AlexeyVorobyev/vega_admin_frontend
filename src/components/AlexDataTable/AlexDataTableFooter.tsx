import {FC, useLayoutEffect, useRef, useState} from "react";
import {FormControl, MenuItem, Pagination, Stack, TextField, Typography} from "@mui/material";
import {theme} from "../Theme/theme";
import {useSearchParams} from "react-router-dom";
import {booleanNumber} from "../functions/booleanNumber";

interface IProps {
    availablePages: number,
    perPageOptions: string[],
    availableElements?: number
}

export const AlexDataTableFooter: FC<IProps> = ({
                                                      availablePages,
                                                      perPageOptions,
                                                      availableElements
                                                  }) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [page, setPage] = useState<string | null>(searchParams.get('page') || null);
    const [perPage, setPerPage] = useState<string | null>(searchParams.get('perPage') || null)
    const savedAvailablePages = useRef<string | null>(booleanNumber(availablePages) ? availablePages.toString() : null)
    const savedAvailableElements = useRef<string | null>(booleanNumber(availableElements) ? availableElements!.toString() : null)

    useLayoutEffect(() => {
        if (!booleanNumber(availablePages)) {
            return
        }
        if (availablePages !== Number(savedAvailablePages.current) && savedAvailablePages.current) {
            setPage('0')
        }
        savedAvailablePages.current = availablePages.toString()
    }, [availablePages])

    useLayoutEffect(() => {
        if (availableElements) {
            savedAvailableElements.current = availableElements!.toString()
        }
    }, [availableElements])

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
            !searchParams.get('perPage') ? ['perPage', perPageOptions[perPageOptions.length / 2]] : [],
            !searchParams.get('page') ? ['page', '0'] : [],
        ].filter((item) => item.length)))
    }, [searchParams])

    return (
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}
               sx={{padding: theme.spacing(2)}}>
            <Typography variant={'subtitle2'} color={theme.palette.text.primary} noWrap>
                Всего элементов: {
                booleanNumber(availableElements)
                    ? availableElements
                    : savedAvailableElements.current ||
                    Number(savedAvailablePages.current) * Number(perPage) || ' '}
            </Typography>
            <Stack direction={'row'} alignItems={'center'} spacing={theme.spacing(2)}>
                <Typography variant={'subtitle2'} color={theme.palette.text.primary} noWrap>На странице:</Typography>
                <FormControl>
                    <TextField
                        value={perPage}
                        onChange={(event) => setPerPage(event.target.value)}
                        select
                        size={'small'}
                    >
                        {perPageOptions.map((option) => <MenuItem key={option.toString()}
                                                                  value={option.toString()}>{option.toString()}</MenuItem>)}
                    </TextField>
                </FormControl>
            </Stack>
            <Pagination
                count={(booleanNumber(availablePages) ? availablePages : Number(savedAvailablePages.current) || 10) || 1}
                page={Number(page) + 1}
                color={'secondary'}
                // @ts-ignore
                onChange={(event: any, value) => setPage((value - 1).toString())}/>
        </Stack>
    )
}