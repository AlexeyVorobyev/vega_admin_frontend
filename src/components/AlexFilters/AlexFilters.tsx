import React, {FC, useState} from "react";
import {IconButton, Popover, Stack, Tooltip} from "@mui/material";
import {theme} from "../Theme/theme";
import TuneIcon from '@mui/icons-material/Tune';

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
            <Stack direction={'column'} padding={theme.spacing(2)}>

            </Stack>
        </Popover>
    </>)
}