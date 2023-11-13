import React, {FC} from "react";
import {Divider, Stack} from "@mui/material";
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

    return (<>
        <Stack direction={'row'} justifyContent={'end'} spacing={theme.spacing(2)}
               padding={theme.spacing(2)} useFlexGap>
            {simpleFilter &&
                <AlexDataTableSimpleFilter setServerSideOptions={setServerSideOptions}
                                           serverSideOptions={serverSideOptions}/>}
            {filterListIds &&
                <AlexFilters filterListIds={filterListIds}/>}
            {columnsSelect &&
                <AlexDataTableColumnsSelect columnsState={columnsState} setColumnsState={setColumnsState}/>}
        </Stack>
        <Divider/>
    </>)
}