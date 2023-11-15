import React, {FC, useLayoutEffect} from "react";
import {Box, CircularProgress, Grid} from "@mui/material";
import {useFormContext} from "react-hook-form";
import {theme} from "../../Theme/theme";
import {AlexInput} from "../../formUtils/AlexInput/AlexInput";
import {useNavigate, useSearchParams} from "react-router-dom";
import {extractIds} from "../../functions/extractIds";
import {
    useLazySpecialityQuery,
    useSpecialityPostMutation,
    useSpecialityPutMutation
} from "../../../redux/api/specialities.api";
import {ISpecialityPostPutPayload} from "../../../redux/api/types/specialities";
import {validCodeSpeciality} from "../../formUtils/Regex/regex";

interface IProps {
    setOnSubmitFunc: React.Dispatch<React.SetStateAction<{ callback: ((data: any) => void) | null }>>
    edit: boolean
}

const DEBUG = true
const DEBUG_PREFIX = 'SPECIALITY_FORM'

export const SpecialitiesForm: FC<IProps> = ({
                                                 setOnSubmitFunc,
                                                 edit
                                             }) => {


    const {formState: {errors}, reset} = useFormContext()
    const [searchParams] = useSearchParams()
    const [addSpeciality] = useSpecialityPostMutation()
    const [updateSpeciality] = useSpecialityPutMutation()
    const [lazySpecialityQuery, result] = useLazySpecialityQuery()
    const navigate = useNavigate()

    useLayoutEffect(() => {
        if (edit) {
            lazySpecialityQuery({id: searchParams.get('id')!})
                .then((response) => {
                    console.log(DEBUG_PREFIX, 'query response', response)
                    const data = {
                        ...response.data,
                    }
                    console.log(DEBUG_PREFIX, 'query after processing', data)
                    reset(data)
                })
        }
    }, [])

    const update = (data: ISpecialityPostPutPayload) => {
        DEBUG && console.log(DEBUG_PREFIX, 'data UPDATE', data)
        updateSpeciality({id: searchParams.get('id')!, body: data})
            .then((response) => {
                console.log(DEBUG_PREFIX, 'promise response', response)
                if (searchParams.get('from')) {
                    navigate(JSON.parse(searchParams.get('from')!))
                } else {
                    navigate('./../table')
                }
            })
    }

    const add = (data: ISpecialityPostPutPayload) => {
        DEBUG && console.log(DEBUG_PREFIX, 'data ADD', data)
        addSpeciality({body: data})
            .then((response) => {
                console.log(DEBUG_PREFIX, 'promise response', response)
                if (searchParams.get('from')) {
                    navigate(JSON.parse(searchParams.get('from')!))
                } else {
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
                <Grid item xs={6}>
                    <AlexInput name={'code'} label={'Код'}
                               error={Boolean(errors.code)} required
                               validateFunctions={{
                                   regex: (valueToCheck: string) => (validCodeSpeciality.test(valueToCheck)) || 'Шаблон: **.**.**'
                               }}
                               errorText={errors.code?.message as string | undefined}/>
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