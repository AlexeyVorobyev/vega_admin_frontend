import {FC, useCallback, useMemo} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Box, CircularProgress, Divider, Stack, TableSortLabel, Typography} from "@mui/material";
import {CustomDataTableFooter} from "./CustomDataTableFooter";
import {useNavigate} from "react-router-dom";
import {CustomDataTableActions} from "./CustomDataTableActions";
import {MutationTrigger} from "@reduxjs/toolkit/dist/query/react/buildHooks";
import {CustomDataTableHeader} from "./CustomDataTableHeader";
import {theme} from "../Theme/theme";
import {CustomDataTableSortWrapper} from "./CustomDataTableSortWrapper";

//TODO FILTERS
//TODO SORTING
//TODO SIMPLEFILTER AND HEADER

export interface ICustomDataTableColumn {
    id: string,
    label: string,
    align?: "center" | "left" | "right" | "inherit" | "justify",
    minWidth?: number,
    format?: (value: any) => string,
    display?: boolean
    sort?: boolean
}

export type ICustomDataTableRow = Map<string, string>

export interface IActionConfig {
    columnName: string // номер столбца для использования в роли id
    path: string // путь к странице
}

export interface IActionsConfig {
    view?: IActionConfig,
    edit?: IActionConfig
    delete?: {
        columnName: string // номер столбца для использования в роли id
        mutation: MutationTrigger<any>// useMutation из RTK
        showModal?: boolean // показывать ли модальное окно для удаления, по дефолту есть
    }
}

interface IProps {
    columns: ICustomDataTableColumn[],
    data: Object[]
    actionsConfig?: IActionsConfig
    availablePages: number,
    perPageOptions?: string[]
    simpleFilter?: boolean
}

export const CustomDataTable: FC<IProps> = ({
                                                columns,
                                                data,
                                                actionsConfig,
                                                availablePages,
                                                perPageOptions = ['1', '2', '4', '8', '16', '32'],
                                                simpleFilter = false
                                            }) => {

    const FormatFlatData = useCallback((columns: ICustomDataTableColumn[], data: Object[]): ICustomDataTableRow[] | null => {
        if (!data) return null
        const resultArr = []
        for (const item of data) {
            const resultFlatRow = new Map()
            for (const column of columns) {
                if (!item.hasOwnProperty(column.id)) continue
                if (typeof item[column.id as keyof Object] !== 'string' || column.format) {
                    if (!column.format) continue
                    resultFlatRow.set(column.id, column.format(item[column.id as keyof Object]))
                } else {
                    resultFlatRow.set(column.id, item[column.id as keyof Object])
                }
            }
            resultArr.push(resultFlatRow)
        }
        return resultArr
    }, [columns, data])

    const rows = useMemo(() => FormatFlatData(columns, data), [columns, data])
    const navigate = useNavigate()

    return (
        <Stack sx={{height: '100%', width: '100%'}} direction={'column'} useFlexGap>
            <CustomDataTableHeader simpleFilter={simpleFilter}/>
            {!rows && (<Box sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <CircularProgress/>
            </Box>)}
            {rows && !rows.length && (<Box sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Typography variant={'h5'}>Данных по заданным параметрам нет</Typography>
            </Box>)}
            {(rows && rows.length) ? (<TableContainer sx={{
                    width: '100%',
                    height: '100%',
                    "&::-webkit-scrollbar": {
                        width: 5,
                        height: 5
                    },
                    "&::-webkit-scrollbar-track": {
                        backgroundColor: null
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#b2b2b2",
                        borderRadius: 2
                    },
                }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                {[
                                    ...columns.map((column) => {
                                        if (column.display === false) return
                                        return (
                                            <TableCell key={column.id} align={column.align}
                                                       style={{minWidth: column.minWidth}}>
                                                {column.sort === false ?
                                                    column.label
                                                    : (<CustomDataTableSortWrapper column={column}>
                                                        {column.label}
                                                    </CustomDataTableSortWrapper>)}
                                            </TableCell>
                                        )
                                    }),
                                    actionsConfig ?
                                        <TableCell key={'actions'} align={'left'}>
                                            Действия
                                        </TableCell>
                                        : undefined
                                ]}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => {
                                return (
                                    <TableRow hover={Boolean(actionsConfig?.view)}
                                              sx={{cursor: actionsConfig?.view ? 'pointer' : undefined}} role="checkbox"
                                              tabIndex={-1} key={index}
                                              onClick={actionsConfig?.view ? () => {
                                                  navigate(`${actionsConfig?.view?.path!}?id=${row.get(actionsConfig!.view!.columnName)}`)
                                              } : undefined}>
                                        {[
                                            ...columns.map((column) => {
                                                if (column.display === false) return
                                                const value = row.get(column.id)
                                                return (
                                                    <TableCell key={column.id} align={column.align || 'left'}>
                                                        {value}
                                                    </TableCell>
                                                )
                                            }),
                                            actionsConfig ?
                                                (<TableCell key={'actions'} align={'left'}>
                                                    <CustomDataTableActions actionsConfig={actionsConfig} row={row}/>
                                                </TableCell>)
                                                : undefined
                                        ]}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>) :
                undefined
            }
            <Box marginTop={'auto'} width={'100%'}>
                <Divider/>
                <CustomDataTableFooter availablePages={availablePages} perPageOptions={perPageOptions}/>
            </Box>
        </Stack>
    )
        ;
}