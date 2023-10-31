import {FC, useCallback, useMemo} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Box, Divider, Stack} from "@mui/material";
import {CustomDataTableFooter} from "./CustomDataTableFooter";
import {useNavigate} from "react-router-dom";

//TODO FILTERS
//TODO PAGINATION FOOTER
//TODO READING QUERIES FROM QUERY STRING

export interface ICustomDataTableColumn {
    id: string,
    label: string,
    align?: "center" | "left" | "right" | "inherit" | "justify",
    minWidth?: number,
    format?: (value: any) => string,
    display?: boolean
}

type ICustomDataTableRow = Map<string, string>

interface IActionConfig {
    columnName: string // номер столбца для использования в роли id
    path: string // путь к странице
}

interface IActionsConfig {
    view?: IActionConfig,
    add?: IActionConfig,
    edit?: IActionConfig
}

interface IProps {
    columns: ICustomDataTableColumn[],
    data: Object[]
    actionsConfig?: IActionsConfig
}

export const CustomDataTable: FC<IProps> = ({
                                                columns,
                                                data,
                                                actionsConfig
                                            }) => {

    const FormatFlatData = useCallback((columns: ICustomDataTableColumn[], data: Object[]): ICustomDataTableRow[] => {
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
                }
            }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => {
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
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => {
                            return (
                                <TableRow hover={Boolean(actionsConfig?.view)}
                                          sx={{cursor: actionsConfig?.view ? 'pointer' : undefined}} role="checkbox"
                                          tabIndex={-1} key={index}
                                          onClick={actionsConfig?.view ? () => {
                                              handleRedirect(row.get(actionsConfig!.view!.columnName) || '', actionsConfig?.view?.path!)
                                          } : undefined}>
                                    {columns.map((column) => {
                                        if (column.display === false) return

                                        const value = row.get(column.id);
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Divider/>
            <Box marginTop={'auto'} width={'100%'}>
                <CustomDataTableFooter availablePages={10}/>
            </Box>
        </Stack>
    );
}