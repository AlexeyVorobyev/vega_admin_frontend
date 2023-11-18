import {FC} from "react";
import {useSearchParams} from "react-router-dom";
import {Box, CircularProgress, Grid} from "@mui/material";
import {theme} from "../../Theme/theme";
import {AlexDataView} from "../../formUtils/AlexDataView/AlexDataView";
import {useUserQuery} from "../../../redux/api/users.api";
import {parseEUserRoleToRusName} from "../../../redux/api/types/users";

export const UsersCard: FC = () => {
    const [searchParams] = useSearchParams()

    const {
        data: userData,
        isFetching,
        isLoading,
        isSuccess
    } = useUserQuery({id: searchParams.get('id')!})

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
                            {parseEUserRoleToRusName(userData.userRole)}
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