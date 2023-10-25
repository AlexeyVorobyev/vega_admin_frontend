import React from "react";
import {FormProvider, useForm} from "react-hook-form";
import {Button, Stack} from "@mui/material";
import {CustomInput} from "../../formUtils/CustomInput/CustomInput";
import {useAuthLoginMutation} from "../../../redux/api/auth.api";
import {useActions} from "../../../redux/hooks/useActions";

const SignIn: React.FC<any> = () => {

    const methods = useForm()
    const {handleSubmit, formState: {errors}} = methods
    // const [authLogin] = useAuthLoginMutation()
    // const {setLogin} = useActions()

    const onSubmit = (data: any) => {
        console.log(data)
    }

    return (
        <FormProvider {...methods} >
            <Stack direction={'column'} justifyContent={'center'} spacing={2}>
                <CustomInput name={'username'} required label={'Логин'}
                             error={Boolean(errors.login)} errorText={errors.login?.message as string | undefined}/>

                <CustomInput name={'password'} required label={'Пароль'} hidden
                             error={Boolean(errors.password)}
                             errorText={errors.password?.message as string | undefined}/>

                <Button size={'large'} variant="contained"
                        onClick={handleSubmit(onSubmit)}>ВОЙТИ</Button>
            </Stack>
        </FormProvider>
    )
}

export {SignIn}
