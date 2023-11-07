import {isRejectedWithValue} from '@reduxjs/toolkit'
import type {Middleware} from '@reduxjs/toolkit'

export const rtkQueryErrorLogger: Middleware =
    () => (next) => (action) => {
        if (isRejectedWithValue(action)) {
            console.log('REJECTED', action)
            //toast.warn({ title: 'Async error!', message: action.error.data.message })
        }

        return next(action)
    }