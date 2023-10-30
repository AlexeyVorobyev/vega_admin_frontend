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
        id: 'description',
        label: 'Описание',
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


// {
//     id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//     title: "string",
//     shortTitle: "string",
//     description: "string",
//     address: "string",
//     site: "string",
//     town: {
//     id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//         title: "string"
// },
//     grade: "HIGH",
//         cardPhoto: "string",
//     priority: 0,
//     studentsTelegramChatUrl: "string"
// }