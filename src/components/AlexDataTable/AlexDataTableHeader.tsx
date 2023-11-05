import React, {FC, useState} from "react";
import {Divider, IconButton, Popover, Stack, Tooltip, Typography} from "@mui/material";
import {theme} from "../Theme/theme";
import {ICustomDataTableColumn} from "./AlexDataTable";
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import Checkbox from '@mui/material/Checkbox';
import {AlexDataTableSimpleFilter} from "./AlexDataTableSimpleFilter";

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

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

    return (<>
        <Stack direction={'row'} justifyContent={'end'} spacing={theme.spacing(2)}
               padding={theme.spacing(2)} useFlexGap>
            {simpleFilter &&
                <AlexDataTableSimpleFilter/>}
            {columnsSelect && (<>
                <Tooltip title={'Отображение столбцов'}>
                    <IconButton onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                        setAnchorEl(event.currentTarget)
                    }}>
                        <ViewWeekIcon color={'secondary'}/>
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
                        {columnsState.map((column) => {
                            return (
                                <Stack direction={'row'} spacing={theme.spacing(1)} alignItems={'center'} key={column.id}>
                                    <Checkbox checked={column.display !== false}
                                              onClick={() => {
                                                  if (column.display === false) {
                                                      setColumnsState((prev) => prev.map((_column) => {
                                                          if (_column.id === column.id) {
                                                              _column.display = true
                                                          }
                                                          return _column
                                                      }))
                                                  } else {
                                                      setColumnsState((prev) => prev.map((_column) => {
                                                          if (_column.id === column.id) {
                                                              _column.display = false
                                                          }
                                                          return _column
                                                      }))
                                                  }
                                              }}/>
                                    <Typography variant={'subtitle1'}
                                                color={theme.palette.text.primary}>{column.label}</Typography>
                                </Stack>
                            )
                        })}
                    </Stack>
                </Popover>
            </>)}
        </Stack>
        <Divider/>
    </>)
}