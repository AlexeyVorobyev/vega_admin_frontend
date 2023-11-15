import {ICustomDataTableColumn} from "../../AlexDataTable/AlexDataTable";
import {ISpecialityEntity, parseEEducationLevelToRusName} from "../../../redux/api/types/specialities";

export const SpecialitiesTableColumns:ICustomDataTableColumn[] = [
    {
        id: 'id',
        label: 'id',
        display: false
    },
    {
        id: 'title',
        label:'Название'
    },
    {
        id: 'code',
        label:'Код'
    },
    {
        id: 'educationLevel',
        label:'Уровень образования',
        format: (value:ISpecialityEntity) => parseEEducationLevelToRusName(value.educationLevel)
    },
    {
        id: 'description',
        label:'Описание',
        display:false
    },
]