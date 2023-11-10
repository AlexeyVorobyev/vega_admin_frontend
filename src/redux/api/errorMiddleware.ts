import {isRejectedWithValue} from '@reduxjs/toolkit'
import type {Middleware} from '@reduxjs/toolkit'
import {toast} from "react-toastify";
import {toastSettings} from "../../components/ToastProvider/ToastProvider";

export const errorMiddleware: Middleware =
    () => (next) => (action) => {
        if (isRejectedWithValue(action)) {
            console.log('REJECTED', action)
            const toastPayload = toastSettings.get('CONNECTION_LOST')!
            toast.error(toastPayload.message,toastPayload.properties)
        }

        return next(action)
    }