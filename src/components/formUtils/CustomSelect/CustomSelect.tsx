import React from "react";
import {FormControl, MenuItem, TextField} from "@mui/material";
import {Controller, useFormContext} from "react-hook-form";

interface Value {
    id: string,
    name: string | number
}

interface Props {
    name: string
    defaultValue?: Value
    label?: string
    options: Array<Value>
    required?: boolean
    error?: boolean,
    errorText?: string
}

export const CustomSelect: React.FC<Props> = ({
                                                name,
                                                defaultValue,
                                                label,
                                                options,
                                                required = true,
                                                error,
                                                errorText
                                            }) => {
    const {control} = useFormContext()

    return (
        <Controller
            name={name}
            defaultValue={defaultValue || ""}
            control={control}
            rules={{
                validate: {
                    required: required ? (value: string) => value?.length > 0 || 'required field' : () => true,
                }
            }}
            render={({field: {onChange, value}}) => (
                <FormControl fullWidth>
                    <TextField
                        value={value?.id}
                        label={error && errorText ? `${label}, ${errorText}` : label}
                        error={error}
                        onChange={onChange}
                        select
                    >
                        {options.map((option) => <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>)}
                    </TextField>
                </FormControl>
            )
            }
        />
    )
}