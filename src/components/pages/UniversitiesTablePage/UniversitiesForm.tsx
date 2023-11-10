import React, {FC, useLayoutEffect} from "react";
import {Box, CircularProgress, Grid} from "@mui/material";
import {useFormContext} from "react-hook-form";
import {theme} from "../../Theme/theme";
import {AlexInput} from "../../formUtils/AlexInput/AlexInput";
import {AlexServerAutoComplete} from "../../formUtils/AlexServerAutocomplete/AlexServerAutoComplete";
import {
    useLazyUniversityQuery,
    useUniversityPostMutation,
    useUniversityPutMutation
} from "../../../redux/api/universities.api";
import {AlexSelect} from "../../formUtils/AlexSelect/AlexSelect";
import {EGrade, IUniversityPostPutPayload} from "../../../redux/api/types/universities";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useLazyTownsAutoCompleteQuery} from "../../../redux/api/towns.api";
import {extractIds} from "../../functions/extractIds";

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


    const {formState: {errors}, reset} = useFormContext()
    const [searchParams] = useSearchParams()
    const [addUniversity] = useUniversityPostMutation()
    const [updateUniversity] = useUniversityPutMutation()
    const [lazyUniversityQuery, result] = useLazyUniversityQuery()
    const navigate = useNavigate()

    useLayoutEffect(() => {
        if (edit) {
            lazyUniversityQuery({id: searchParams.get('id')!})
                .then((response) => {
                    console.log(DEBUG_PREFIX, 'query response', response)
                    const data = {
                        ...response.data,
                        town: {
                            id: response.data.town.id,
                            name: response.data.town.title
                        }
                    }
                    console.log(DEBUG_PREFIX, 'query after processing', data)
                    reset(data)
                })
        }
    }, [])

    const update = (data: IUniversityPostPutPayload) => {
        DEBUG && console.log(DEBUG_PREFIX, 'data UPDATE', data)
        updateUniversity({id: searchParams.get('id')!, body: data})
            .then((response) => {
                console.log(DEBUG_PREFIX, 'promise response', response)
                if (searchParams.get('from')) {
                    navigate(JSON.parse(searchParams.get('from')!))
                }
                else {
                    navigate('./../table')
                }
            })
    }

    const add = (data: IUniversityPostPutPayload) => {
        DEBUG && console.log(DEBUG_PREFIX, 'data ADD', data)
        addUniversity({body: data})
            .then((response) => {
                console.log(DEBUG_PREFIX, 'promise response', response)
                if (searchParams.get('from')) {
                    navigate(JSON.parse(searchParams.get('from')!))
                }
                else {
                    navigate('./../table')
                }
            })
    }

    const onSubmit = (data: any) => {
        DEBUG && console.log(DEBUG_PREFIX, 'data BEFORE processing', data)
        data = extractIds(data)

        if (edit) {
            DEBUG && console.log(DEBUG_PREFIX, 'data AFTER processing', data)
            update(data)
        } else {
            data.priority = 0
            DEBUG && console.log(DEBUG_PREFIX, 'data AFTER processing', data)
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
    }}>
        {(edit && !result.data) && (<Box sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <CircularProgress/>
        </Box>)}
        {(!edit || result.data) && (<Box sx={{
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