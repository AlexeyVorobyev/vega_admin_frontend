import {FC} from "react";
import {useSearchParams} from "react-router-dom";
import {Box, CircularProgress, Grid} from "@mui/material";
import {theme} from "../../Theme/theme";
import {AlexDataView} from "../../formUtils/AlexDataView/AlexDataView";
import {useSpecialityQuery} from "../../../redux/api/specialities.api";
import {parseEEducationLevelToRusName} from "../../../redux/api/types/specialities";

export const SpecialitiesCard: FC = () => {
    const [searchParams] = useSearchParams()

    const {
        data: specialityData,
        isFetching,
        isLoading,
        isSuccess
    } = useSpecialityQuery({id: searchParams.get('id')!})

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
                            {specialityData.id}
                        </AlexDataView>
                    </Grid>
                    <Grid item xs={6}>
                        <AlexDataView label={'Код'}>
                            {specialityData.code}
                        </AlexDataView>
                    </Grid>
                    <Grid item xs={6}>
                        <AlexDataView label={'Название'}>
                            {specialityData.title}
                        </AlexDataView>
                    </Grid>
                    <Grid item xs={6}>
                        <AlexDataView label={'Уровень образования'}>
                            {parseEEducationLevelToRusName(specialityData.educationLevel)}
                        </AlexDataView>
                    </Grid>
                    <Grid item xs={12}>
                        <AlexDataView label={'Описание'}>
                            {specialityData.description}
                        </AlexDataView>
                    </Grid>
                </Grid>
            </Box>)}
        </Box>
    )
}