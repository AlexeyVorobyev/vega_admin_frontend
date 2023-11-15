import {ICustomDataTableColumn} from "../../AlexDataTable/AlexDataTable";
import {IUniversityEntity, parseEGradeToRusName} from "../../../redux/api/types/universities";
import {Tooltip} from "@mui/material";

export const UniversitiesTableColumns: ICustomDataTableColumn[] = [
    {
        id: 'id',
        label: 'id',
        display: false
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
        format: (value: IUniversityEntity) => (
            <Tooltip title={'Перейти по ссылке'}>
                <a href={value.site}
                   onClick={(event) => event.stopPropagation()}>{value.site}</a>
            </Tooltip>
        )
    },
    {
        id: 'studentsTelegramChatUrl',
        label: 'Cтуденческий чат, Телеграм',
        format: (value: IUniversityEntity) => (
            <Tooltip title={'Перейти по ссылке'}>
                <a href={value.studentsTelegramChatUrl}
                   onClick={(event) => event.stopPropagation()}>{value.studentsTelegramChatUrl}</a>
            </Tooltip>
        ),
        display: false
    },
    {
        id: 'town',
        label: 'Город',
        format: (value: IUniversityEntity) => value.town.title
    },
    {
        id: 'grade',
        label: 'Вид',
        format: (value: IUniversityEntity) => parseEGradeToRusName(value.grade),
    },
    {
        id: 'description',
        label: 'Описание',
        display: false
    },
    {
        id: 'cardPhoto',
        label: 'Фотография',
        format: (value: IUniversityEntity) => (
            <Tooltip title={'Открыть фото в новом окне'}>
                <a href={value.cardPhoto}
                   onClick={(event) => event.stopPropagation()}>{value.cardPhoto}</a>
            </Tooltip>
        ),
        display: false
    },
    // {
    //     id: 'priority',
    //     label: 'Приоритет',
    //     format: (value: IUniversityEntity) => value.priority.toString(),
    //     display: false
    // },
]

