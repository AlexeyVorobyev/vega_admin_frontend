import {FC, ReactNode, useEffect, useLayoutEffect, useState} from "react";
import {ICustomDataTableColumn} from "./CustomDataTable";
import {TableSortLabel} from "@mui/material";
import {useSearchParams} from "react-router-dom";

interface IProps {
    column: ICustomDataTableColumn
    children: ReactNode
}

type TSortParam = 'asc' | 'desc'

interface ISortParams {
    [key: string]: string
}

export const CustomDataTableSortWrapper: FC<IProps> = ({
                                                           column,
                                                           children
                                                       }) => {

    const [sortState, setSortState] = useState<TSortParam | null>(null)
    const [searchParams, setSearchParams] = useSearchParams()

    useLayoutEffect(() => {
        let sortParams: ISortParams = JSON.parse(searchParams.get('sort') || '{}')
        if (!sortParams.hasOwnProperty(column.id)) return
        setSortState(sortParams[column.id] as TSortParam)
    }, [searchParams])

    useEffect(() => {
        if (!sortState) {
            setSearchParams(
                new URLSearchParams(Array.from(searchParams.entries()).filter((item) => item[0] !== 'sort'))
            )
            return
        }
        if (!searchParams.get('sort')) {
            setSearchParams(new URLSearchParams([
                ...Array.from(searchParams.entries()),
                ['sort', JSON.stringify({[column.id]: 'asc'})]
            ]))
        } else {
            const sortParams: ISortParams = JSON.parse(searchParams.get('sort')!)
            sortParams[column.id] = sortState
            setSearchParams(new URLSearchParams([
                ...Array.from(searchParams.entries()).filter((item) => item[0] !== 'sort'),
                ['sort', JSON.stringify(sortParams)]
            ]))
        }
    }, [sortState])

    return (
        <TableSortLabel direction={sortState || undefined} active={Boolean(sortState)}
                        onClick={() => {
                            setSortState((prev) => {
                                if (!prev) return 'asc'
                                return prev === 'asc' ? 'desc' : prev === 'desc' ? null : 'asc'
                            })
                        }}>
            {children}
        </TableSortLabel>
    )
}
