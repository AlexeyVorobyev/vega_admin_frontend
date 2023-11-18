import {FC} from "react";
import {useSearchParams} from "react-router-dom";
import {useUniversityQuery} from "../../../redux/api/universities.api";
import {Box, CircularProgress, Grid, Tooltip, Typography} from "@mui/material";
import {parseEGradeToRusName} from "../../../redux/api/types/universities";
import {theme} from "../../Theme/theme";
import {AlexDataView} from "../../formUtils/AlexDataView/AlexDataView";
import {AlexImageView} from "../../formUtils/AlexImageView/AlexImageView";

export const UniversitiesCard: FC = () => {
    const [searchParams] = useSearchParams()

    const {
        data: universityData,
        isFetching,
        isLoading,
        isSuccess
    } = useUniversityQuery({id: searchParams.get('id')!})

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
                    <Grid item xs={5}>
                        <AlexDataView label={'Фотография'}>
                            {universityData.cardPhoto &&
                                <AlexImageView src={universityData.cardPhoto}
                                               modal
                                               beforeLoadedSize={{
                                                   width: '100%',
                                                   height: '200px'
                                               }}/>}
                        </AlexDataView>
                    </Grid>
                    <Grid item xs={7}/>
                    <Grid item xs={6}>
                        <AlexDataView label={'ID'}>
                            {universityData.id}
                        </AlexDataView>
                    </Grid>
                    <Grid item xs={6}>
                        <AlexDataView label={'Вид'}>
                            {parseEGradeToRusName(universityData.grade)}
                        </AlexDataView>
                    </Grid>
                    <Grid item xs={6}>
                        <AlexDataView label={'Название'}>
                            {universityData.title}
                        </AlexDataView>
                    </Grid>
                    <Grid item xs={6}>
                        <AlexDataView label={'Короткое название'}>
                            {universityData.shortTitle}
                        </AlexDataView>
                    </Grid>
                    <Grid item xs={6}>
                        <AlexDataView label={'Город'}>
                            {universityData.town.title}
                        </AlexDataView>
                    </Grid>
                    <Grid item xs={6}>
                        <AlexDataView label={'Адрес'}>
                            {universityData.address}
                        </AlexDataView>
                    </Grid>
                    <Grid item xs={6}>
                        <AlexDataView label={'Сайт'}>
                            {universityData.site ? <Typography variant={'body1'}>
                                <Tooltip title={'Перейти по ссылке'} placement={'bottom-start'}>
                                    <a href={universityData.site}>
                                        {universityData.site}
                                    </a>
                                </Tooltip>
                            </Typography> : ''}
                        </AlexDataView>
                    </Grid>
                    <Grid item xs={6}>
                        <AlexDataView label={'Студенческий телеграм'}>
                            {universityData.studentsTelegramChatUrl ?
                                <Typography variant={'body1'}>
                                    <Tooltip title={'Перейти по ссылке'} placement={'bottom-start'}>
                                        <a href={universityData.studentsTelegramChatUrl}>
                                            {universityData.studentsTelegramChatUrl}
                                        </a>
                                    </Tooltip>
                                </Typography> : ''}
                        </AlexDataView>
                    </Grid>
                    <Grid item xs={12} sx={{marginBottom: theme.spacing(2)}}>
                        <AlexDataView label={'Описание'}>
                            {universityData.description}
                        </AlexDataView>
                    </Grid>
                </Grid>
            </Box>)}
        </Box>
    )
}