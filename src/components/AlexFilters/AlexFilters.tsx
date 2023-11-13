import React, {FC, useCallback, useState} from "react";
import {Box, Button, Divider, IconButton, Popover, Stack, Tooltip, Typography} from "@mui/material";
import TuneIcon from '@mui/icons-material/Tune';
import {AlexFiltersFormContext} from "./AlexFiltersFormContext";
import {alexFiltersMap} from "./alexFiltersMap";
import {theme} from "../Theme/theme";

interface IProps {
    filterListIds: string[]
}

export const AlexFilters: FC<IProps> = ({
                                            filterListIds
                                        }) => {

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

    return (<>
        <Tooltip title={'Фильтры'}>
            <IconButton onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                setAnchorEl(event.currentTarget)
            }}>
                <TuneIcon color={'secondary'}/>
            </IconButton>
        </Tooltip>
        <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            <AlexFiltersFormContext setAnchorEl={setAnchorEl}>

            </AlexFiltersFormContext>
        </Popover>
    </>)
}