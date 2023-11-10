import React, {FC, useLayoutEffect} from "react";
import {Box, Grid} from "@mui/material";
import {useFormContext} from "react-hook-form";
import {theme} from "../../Theme/theme";
import {AlexInput} from "../../formUtils/AlexInput/AlexInput";
import {AlexServerAutoComplete} from "../../formUtils/AlexServerAutocomplete/AlexServerAutoComplete";
import {useUniversityPostMutation} from "../../../redux/api/universities.api";
import {AlexSelect} from "../../formUtils/AlexSelect/AlexSelect";
import {EGrade, IUniversityPostPayload} from "../../../redux/api/types/universities";
import {useNavigate} from "react-router-dom";
import {useLazyTownsAutoCompleteQuery} from "../../../redux/api/towns.api";

interface IProps {
    setOnSubmitFunc: React.Dispatch<React.SetStateAction<{ callback: ((data: any) => void) | null }>>
    edit: boolean
}

const DEBUG = true
const DEBUG_PREFIX = 'UNIVERSITY_FORM'

export const UniversitiesForm: FC<IProps> = ({
                                                 setOnSubmitFunc,
                                                 edit
                                             }) => {


    const {formState: {errors}} = useFormContext()
    const [addUniversity] = useUniversityPostMutation()
    const navigate = useNavigate()

    const update = (data: any) => {

    }

    const add = (data: IUniversityPostPayload) => {
        addUniversity(data)
            .then((response) => {
                console.log(DEBUG_PREFIX, 'promise response', response)
                navigate('./../table')
            })
    }

    const onSubmit = (data: any) => {
        DEBUG && console.log(DEBUG_PREFIX, 'data BEFORE processing', data)
        data.priority = 0

        DEBUG && console.log(DEBUG_PREFIX, 'data AFTER processing', data)

        if (edit) {

        } else {
            add(data)
        }
    }

    useLayoutEffect(() => {
        setOnSubmitFunc({callback: onSubmit})
    }, [])

    return (<Box sx={{
        width: '100%',
        display: 'flex',
        flex: 1,
        overflowY: 'scroll',
        "&::-webkit-scrollbar": {
            width: 5,
            height: 5
        },
        "&::-webkit-scrollbar-track": {
            backgroundColor: null
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#b2b2b2",
            borderRadius: 2
        },
    }}>
        {(<Box sx={{
            width: '100%',
            padding: theme.spacing(2),
            boxSizing: 'border-box'
        }}>
            <Grid container spacing={theme.spacing(2)}>
                <Grid item xs={6}>
                    <AlexInput name={'title'} label={'Название'}
                               error={Boolean(errors.title)} required
                               errorText={errors.title?.message as string | undefined}/>
                </Grid>
                <Grid item lg={3} xs={6}>
                    <AlexInput name={'shortTitle'} label={'Короткое название'}
                               error={Boolean(errors.shortTitle)} required
                               errorText={errors.shortTitle?.message as string | undefined}/>
                </Grid>
                <Grid item lg={3} xs={6}>
                    <AlexInput name={'address'} label={'Адрес'}
                               error={Boolean(errors.address)} required
                               errorText={errors.address?.message as string | undefined}/>
                </Grid>
                <Grid item xs={6}>
                    <AlexInput name={'cardPhoto'} label={'Фото (ссылка)'}/>
                </Grid>
                <Grid item lg={3} xs={6}>
                    <AlexServerAutoComplete name={'town'} label={'Город'}
                                            useLazyGetQuery={useLazyTownsAutoCompleteQuery}
                                            error={Boolean(errors.town)} required
                                            errorText={errors.town?.message as string | undefined}
                                            optionsConfig={{
                                                optionsPath: ['content'],
                                                optionsReadFunction: (option: any) => {
                                                    return {
                                                        id: option.id,
                                                        name: option.title
                                                    }
                                                }
                                            }}/>
                </Grid>
                <Grid item lg={3} xs={6}>
                    <AlexSelect name={'grade'} label={'Вид'}
                                options={[{id: EGrade.High, name: 'ВУЗ'}, {id: EGrade.Middle, name: 'ССУЗ'}]}
                                error={Boolean(errors.grade)} required
                                errorText={errors.grade?.message as string | undefined}/>
                </Grid>
                <Grid item xs={6}>
                    <AlexInput name={'site'} label={'Cайт (ссылка)'}
                               error={Boolean(errors.site)} required
                               errorText={errors.site?.message as string | undefined}/>
                </Grid>
                <Grid item xs={6}>
                    <AlexInput name={'studentsTelegramChatUrl'} label={'Телеграм (ссылка)'}/>
                </Grid>
                <Grid item xs={12}>
                    <AlexInput name={'description'} label={'Описание'} multiline maxRows={12}
                               error={Boolean(errors.description)} required
                               errorText={errors.description?.message as string | undefined}/>
                </Grid>
            </Grid>
        </Box>)}
    </Box>)
}