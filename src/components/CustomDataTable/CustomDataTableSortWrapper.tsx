import {FC, ReactNode, useState} from "react";
import {ICustomDataTableColumn} from "./CustomDataTable";
import {TableSortLabel} from "@mui/material";

interface IProps {
    column: ICustomDataTableColumn
    children: ReactNode
}

export const CustomDataTableSortWrapper: FC<IProps> = ({
                                                           column,
                                                           children
                                                       }) => {

    const [sortState, setSortState] = useState<'asc' | 'desc' | null>(null)
    console.log(column)

    return (
        <TableSortLabel direction={sortState || undefined} active={Boolean(sortState)}
                        onClick={() => {
                            setSortState((prev) => {
                                if (!prev) return 'asc'
                                return prev === 'asc' ? 'desc' : 'asc'
                            })
                        }}>
            {children}
        </TableSortLabel>
    )
}
