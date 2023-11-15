import {ICustomDataTableColumn} from "../../AlexDataTable/AlexDataTable";
import {IUserEntity, parseEUserRoleToRusName} from "../../../redux/api/types/users";

export const UsersTableColumns: ICustomDataTableColumn[] = [
    {
        id: 'id',
        label: 'id',
        display: false
    },
    {
        id: 'telegramId',
        label: 'Телеграм id',
        format: (value: IUserEntity) => value.telegramId.toString()
    },
    {
        id: 'userRole',
        label: 'Роль',
        format: (value: IUserEntity) => parseEUserRoleToRusName(value.userRole)
    },
    {
        id: 'username',
        label: 'Имя пользователя',
    },
    {
        id: 'forename',
        label: 'Имя',
    },
    {
        id: 'surname',
        label: 'Фамилия',
    },
]