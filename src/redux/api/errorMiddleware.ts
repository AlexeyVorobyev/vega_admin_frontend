import {isRejectedWithValue} from '@reduxjs/toolkit'
import type {Middleware} from '@reduxjs/toolkit'
import {toast} from "react-toastify";
import {toastSettings} from "../../components/ToastProvider/ToastProvider";

export const errorMiddleware: Middleware =
    () => (next) => (action) => {
        if (isRejectedWithValue(action)) {
            console.log('REJECTED', action)
            console.log(action.type,action.type === 'api/executeMutation/rejected')
            if (action.type === 'api/executeMutation/rejected') {
                const toastPayload = toastSettings.get('CONNECTION_LOST')!
                toast.error(action.payload.data.message,toastPayload.properties)
            }
            else {
                const toastPayload = toastSettings.get('CONNECTION_LOST')!
                toast.error(toastPayload.message,toastPayload.properties)
            }
        }

        return next(action)
    }