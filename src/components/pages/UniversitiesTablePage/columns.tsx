import {ICustomDataTableColumn} from "../../CustomDataTable/CustomDataTable";
import {EGrade} from "../../../redux/api/types/universities";
import {Tooltip} from "@mui/material";

export const UniversitiesTableColumns: ICustomDataTableColumn[] = [
    {
        id: 'id',
        label: 'id',
    },
    {
        id: 'title',
        label: 'Название',
    },
    {
        id: 'shortTitle',
        label: 'Короткое название',
    },
    {
        id: 'address',
        label: 'Адрес',
    },
    {
        id: 'site',
        label: 'Сайт',
        format: (value: any) => (
            <Tooltip title={'Перейти по ссылке'}>
                <a href={value}
                   onClick={(event) => event.stopPropagation()}>{value}</a>
            </Tooltip>
        )
    },
    {
        id: 'town',
        label: 'Город',
        format: (value: any) => value.title
    },
    {
        id: 'grade',
        label: 'Курс',
        format: (value: any) => value === EGrade.High ? 'Старший' : 'Младший'
    }
]

