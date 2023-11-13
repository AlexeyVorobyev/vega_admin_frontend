import React, {FC, useMemo} from "react";
import {Chip, Divider, Stack, Typography} from "@mui/material";
import {theme} from "../Theme/theme";
import {ICustomDataTableColumn} from "./AlexDataTable";
import {AlexDataTableSimpleFilter} from "./AlexDataTableSimpleFilter";
import {AlexDataTableColumnsSelect} from "./AlexDataTableColumnsSelect";
import {AlexFilters} from "../AlexFilters/AlexFilters";

interface IProps {
    simpleFilter: boolean
    columnsSelect: boolean
    columnsState: ICustomDataTableColumn[]
    setColumnsState: React.Dispatch<React.SetStateAction<ICustomDataTableColumn[]>>,
    filterListIds?: string[]
    serverSideOptions: Map<string, any>
    setServerSideOptions: React.Dispatch<React.SetStateAction<Map<string, any>>>
}

export const AlexDataTableHeader: FC<IProps> = ({
                                                    simpleFilter,
                                                    columnsState,
                                                    columnsSelect,
                                                    setColumnsState,
                                                    filterListIds,
                                                    serverSideOptions,
                                                    setServerSideOptions
                                                }) => {
    const amountOfChosenFilters = useMemo(() => {
        if (!filterListIds) return 0
        return Array.from(serverSideOptions)
            .filter((param) => [...filterListIds, 'simpleFilter'].includes(param[0])).length
    }, [serverSideOptions, filterListIds])

    return (<>
        <Stack direction={'row'} justifyContent={'end'} spacing={theme.spacing(2)}
               padding={theme.spacing(2)} useFlexGap alignItems={'center'}>
            <Stack direction={'row'} spacing={theme.spacing(2)} alignItems={'center'} sx={{marginRight: 'auto'}}>
                {simpleFilter &&
                    <AlexDataTableSimpleFilter setServerSideOptions={setServerSideOptions}
                                               serverSideOptions={serverSideOptions}/>}
                {amountOfChosenFilters
                    ? <Chip label={<Typography variant={'body1'}>
                        Применённые фильтры: {amountOfChosenFilters}</Typography>}/>
                    : undefined}
            </Stack>
            {filterListIds &&
                <AlexFilters filterListIds={filterListIds} setServerSideOptions={setServerSideOptions}
                             serverSideOptions={serverSideOptions}/>}
            {columnsSelect &&
                <AlexDataTableColumnsSelect columnsState={columnsState} setColumnsState={setColumnsState}/>}
        </Stack>
        <Divider/>
    </>)
}