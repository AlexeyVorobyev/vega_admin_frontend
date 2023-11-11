import {ICustomDataTableColumn} from "../../AlexDataTable/AlexDataTable";
import {EUserRole, IUserEntity} from "../../../redux/api/types/users";

export const UsersTableColumns:ICustomDataTableColumn[] = [
    {
        id: 'id',
        label: 'id',
        display: false
    },
    {
        id: 'telegramId',
        label: 'Телеграм id',
        format: (value:IUserEntity) => value.telegramId.toString()
    },
    {
        id: 'userRole',
        label: 'Роль',
        format: (value:IUserEntity) => {
            switch (value.userRole) {
                case EUserRole.admin:
                    return 'Админ'
                case EUserRole.student:
                    return 'Судент'
                case EUserRole.service:
                    return 'Модератор'
                case EUserRole.tutor:
                    return 'Репетитор'
            }
        }
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