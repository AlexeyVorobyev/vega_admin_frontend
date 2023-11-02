import {FC, useCallback, useMemo, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Box, CircularProgress, Divider, Stack} from "@mui/material";
import {CustomDataTableFooter} from "./CustomDataTableFooter";
import {useNavigate} from "react-router-dom";
import {CustomDataTableActions} from "./CustomDataTableActions";

//TODO FILTERS
//TODO Сделать нормальную страницу об отсутствии данных

export interface ICustomDataTableColumn {
    id: string,
    label: string,
    align?: "center" | "left" | "right" | "inherit" | "justify",
    minWidth?: number,
    format?: (value: any) => string,
    display?: boolean
}

export type ICustomDataTableRow = Map<string, string>

export interface IActionConfig {
    columnName: string // номер столбца для использования в роли id
    path: string // путь к странице
}

export interface IActionsConfig {
    view?: IActionConfig,
    add?: IActionConfig,
    edit?: IActionConfig
}

interface IProps {
    columns: ICustomDataTableColumn[],
    data: Object[]
    actionsConfig?: IActionsConfig
    availablePages: number
}

export const CustomDataTable: FC<IProps> = ({
                                                columns,
                                                data,
                                                actionsConfig,
                                                availablePages
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

    const handleRedirect = useCallback((id: string, path: string) => {
        navigate(`${path}?id=${id}`)
    }, [rows])

    const [preventEvent,setPreventEvent] = useState<boolean>(false)

    return (
        <Stack sx={{height: '100%', width: '100%'}} direction={'column'} useFlexGap>
            <TableContainer sx={{
                width: '100%',
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
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{minWidth: column.minWidth}}
                                        >
                                            {column.label}
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
                        {!rows && <CircularProgress/>}
                        {rows && !rows.length && <p>Данных нет</p>}
                        {rows && rows?.length && rows.map((row, index) => {
                            return (
                                <TableRow hover={Boolean(actionsConfig?.view)}
                                          sx={{cursor: actionsConfig?.view ? 'pointer' : undefined}} role="checkbox"
                                          tabIndex={-1} key={index}
                                          onClick={actionsConfig?.view ? () => {
                                              if (preventEvent) return
                                              handleRedirect(row.get(actionsConfig!.view!.columnName) || '', actionsConfig?.view?.path!)
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
                                                <CustomDataTableActions actionsConfig={actionsConfig} row={row}
                                                                        handleRedirect={handleRedirect} setPreventEvent={setPreventEvent}/>
                                            </TableCell>)
                                            : undefined
                                    ]}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box marginTop={'auto'} width={'100%'}>
                <Divider/>
                <CustomDataTableFooter availablePages={availablePages}/>
            </Box>
        </Stack>
    );
}