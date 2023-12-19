import {FC, useMemo} from 'react'
import {Box, CircularProgress, Grid} from '@mui/material'
import {theme} from '../../Theme/theme'
import {TMeEntity} from '../../../redux/api/types/auth'
import {AlexDataView} from '../../formUtils/AlexDataView/AlexDataView'
import {useMeQuery} from '../../../redux/api/auth.api'
import {parseEUserRoleToRusName} from '../../../redux/api/types/users'

interface IProps {
}

export const CabinetPage: FC<IProps> = () => {

    const {
        data,
        isFetching,
        isLoading,
        isSuccess
    } = useMeQuery(null)
    const meData = useMemo(() => data as TMeEntity, [data])

    console.debug('ME_DATA', meData, data)

    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            height: '100%',
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
                            {meData.id}
                        </AlexDataView>
                    </Grid>
                    <Grid item xs={6}>
                        <AlexDataView label={'Роль'}>
                            {parseEUserRoleToRusName(meData.userRole)}
                        </AlexDataView>
                    </Grid>
                    <Grid item xs={6}>
                        <AlexDataView label={'Telegram ID'}>
                            {meData.telegramId}
                        </AlexDataView>
                    </Grid>
                    <Grid item xs={6}>
                        <AlexDataView label={'Имя'}>
                            {meData.forename}
                        </AlexDataView>
                    </Grid>
                    <Grid item xs={6}>
                        <AlexDataView label={'Фамилия'}>
                            {meData.surname}
                        </AlexDataView>
                    </Grid>
                    <Grid item xs={6}>
                        <AlexDataView label={'Логин'}>
                            {meData.username}
                        </AlexDataView>
                    </Grid>
                </Grid>
            </Box>)}
        </Box>
    )
}