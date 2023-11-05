import {FC, useCallback, useEffect, useLayoutEffect, useState} from "react";
import {InputAdornment, TextField} from "@mui/material";
import {useSearchParams} from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import {debounce} from "../functions/debounce";

export const AlexDataTableSimpleFilter: FC = () => {

    const [simpleFilterState, setSimpleFilterState] = useState<string | null>(null)
    const [middleWareFilterState, setMiddleWareFilterState] = useState<string | null>(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const debouncedSetMiddleWareFilterState = useCallback(debounce(setMiddleWareFilterState, 500), [])

    useLayoutEffect(() => {
        const simpleFilterSearchParam = searchParams.get('simpleFilter')
        simpleFilterSearchParam && setMiddleWareFilterState(simpleFilterSearchParam)
        simpleFilterSearchParam && setSimpleFilterState(simpleFilterSearchParam)
    }, [searchParams])

    useLayoutEffect(() => {
        debouncedSetMiddleWareFilterState(simpleFilterState)
    }, [simpleFilterState])

    useEffect(() => {
        setSearchParams(new URLSearchParams([
            ...Array.from(searchParams.entries()).filter((item) => item[0] !== 'simpleFilter'),
            middleWareFilterState ? ['simpleFilter', middleWareFilterState] : []
        ].filter((item) => item.length)))
    }, [middleWareFilterState])

    return (
        <TextField
            sx={{marginRight: 'auto'}}
            value={simpleFilterState || ''}
            onChange={(event) => {
                const value = event.currentTarget.value
                setSimpleFilterState(value.length ? value : null)
            }}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <SearchIcon color={simpleFilterState ? 'secondary' : undefined}/>
                    </InputAdornment>
                ),
            }}
            id={'simpleFilter'}
            color={'secondary'}
            label={'Поиск'}
            size={'small'}
            variant={'outlined'}/>
    )
}