import {FC, useCallback, useMemo} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Stack} from "@mui/material";

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

interface IProps {
    columns: ICustomDataTableColumn[],
    data: Object[]
}

export const CustomDataTable: FC<IProps> = ({
                                                columns,
                                                data
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
                }
                else {
                    resultFlatRow.set(column.id, item[column.id as keyof Object])
                }
            }

            resultArr.push(resultFlatRow)
        }

        return resultArr
    }, [columns, data])

    const rows = useMemo(() => FormatFlatData(columns, data), [columns, data])

    console.log(rows)

    return (
        <Stack sx={{height: '100%', width: '100%'}} direction={'column'}>
            <TableContainer sx={{width: '100%'}}>
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
                                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
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
        </Stack>
    );
}