import React, {FC} from "react";
import {Divider, Stack} from "@mui/material";
import {theme} from "../Theme/theme";
import {ICustomDataTableColumn} from "./AlexDataTable";
import {AlexDataTableSimpleFilter} from "./AlexDataTableSimpleFilter";
import {AlexDataTableColumnsSelect} from "./AlexDataTableColumnsSelect";

interface IProps {
    simpleFilter: boolean
    columnsSelect: boolean
    columnsState: ICustomDataTableColumn[]
    setColumnsState: React.Dispatch<React.SetStateAction<ICustomDataTableColumn[]>>
}

export const AlexDataTableHeader: FC<IProps> = ({
                                                    simpleFilter,
                                                    columnsState,
                                                    columnsSelect,
                                                    setColumnsState
                                                }) => {

    return (<>
        <Stack direction={'row'} justifyContent={'end'} spacing={theme.spacing(2)}
               padding={theme.spacing(2)} useFlexGap>
            {simpleFilter &&
                <AlexDataTableSimpleFilter/>}
            {columnsSelect &&
                <AlexDataTableColumnsSelect columnsState={columnsState} setColumnsState={setColumnsState}/>}
        </Stack>
        <Divider/>
    </>)
}