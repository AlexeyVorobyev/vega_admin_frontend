import {FC, useMemo} from "react";
import {useSearchParams} from "react-router-dom";
import {Box, CircularProgress, Grid} from "@mui/material";
import {theme} from "../../Theme/theme";
import {AlexDataView} from "../../formUtils/AlexDataView/AlexDataView";
import {useUserQuery} from "../../../redux/api/users.api";
import {EUserRole, IUserEntity} from "../../../redux/api/types/users";

export const UsersCard: FC = () => {
    const [searchParams] = useSearchParams()

    const {
        data,
        isFetching,
        isLoading,
        isSuccess
    } = useUserQuery({id: searchParams.get('id')!}, {
        skip: false,
    })

    const userData: IUserEntity = useMemo(() => data as IUserEntity, [data])

    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            flex: 1,
            overflowY: 'scroll',
        }}>
            {(isLoading || isFetching || !isSuccess) && (<Box sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <CircularProgress/>
            </Box>)}
            {(!isLoading && !isFetching && isSuccess) && (<Box sx={{
                width: '100%',
                padding: theme.spacing(2),
                boxSizing: 'border-box'
            }}>
                <Grid container spacing={theme.spacing(2)}>
                    <Grid item xs={6}>
                        <AlexDataView label={'ID'}>
                            {userData.id}
                        </AlexDataView>
                    </Grid>
                    <Grid item xs={6}>
                        <AlexDataView label={'Роль'}>
                            {(() => {
                                switch (userData.userRole) {
                                    case EUserRole.admin:
                                        return 'Админ'
                                    case EUserRole.student:
                                        return 'Судент'
                                    case EUserRole.service:
                                        return 'Модератор'
                                    case EUserRole.tutor:
                                        return 'Репетитор'
                                }
                            })()
                            }
                        </AlexDataView>
                    </Grid>
                    <Grid item xs={6}>
                        <AlexDataView label={'Телеграм ID'}>
                            {userData.telegramId}
                        </AlexDataView>
                    </Grid>
                    <Grid item xs={6}>
                        <AlexDataView label={'Имя пользователя'}>
                            {userData.username}
                        </AlexDataView>
                    </Grid>
                    <Grid item xs={6}>
                        <AlexDataView label={'Имя'}>
                            {userData.forename}
                        </AlexDataView>
                    </Grid>
                    <Grid item xs={6}>
                        <AlexDataView label={'Фамилия'}>
                            {userData.surname}
                        </AlexDataView>
                    </Grid>
                </Grid>
            </Box>)}
        </Box>
    )
}