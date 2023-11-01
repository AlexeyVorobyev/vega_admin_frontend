import {ICustomDataTableColumn} from "../../CustomDataTable/CustomDataTable";
import {EGrade} from "../../../redux/api/types/universities";

export const UniversitiesTableColumns:ICustomDataTableColumn[] = [
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
    },
    {
        id: 'town',
        label: 'Город',
        format: (value:any) => value.title
    },
    {
        id: 'grade',
        label: 'Курс',
        format: (value:any) => value === EGrade.High ? 'Старший' : 'Младший'
    }
]