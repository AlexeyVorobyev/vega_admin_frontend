import {useSearchParams} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";

export enum EUsePageStateMode {
    queryString = 'QUERY_STRING',
    sessionStorage = 'SESSION_STORAGE'
}

interface IProps {
    varsBehaviorMap?: (params: any) => any
    mode?: EUsePageStateMode.queryString | EUsePageStateMode.sessionStorage,
    sessionStorageKey?: string
}

const DEBUG = true
const DEBUG_PREFIX = 'USE_PAGE_STATE'

const replacer = (key: string, value: any) => {
    if (value instanceof Map) {
        return {
            dataType: 'Map',
            value: Array.from(value.entries()),
        }
    } else {
        return value
    }
}
const reviver = (key: string, value: any) => {
    if (typeof value === 'object' && value !== null) {
        if (value.dataType === 'Map') {
            return new Map(value.value)
        }
    }
    return value
}

export const usePageState = ({
                                 varsBehaviorMap,
                                 mode = EUsePageStateMode.queryString,
                                 sessionStorageKey = 'pageState'
                             }: IProps) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [processedParams, setProcessedParams] = useState<any | null>(null)

    // синхронизация состояний queryString | sessionStorage -> serverSideOptions при моунте
    const initialSetServerSideOptions = useCallback(() => {
        switch (mode) {
            case EUsePageStateMode.queryString:
                return new Map(
                    Array.from(searchParams.entries()).map((param) => [param[0], JSON.parse(param[1], reviver)])
                )
            case EUsePageStateMode.sessionStorage:
                const stringValue = sessionStorage.getItem(sessionStorageKey)
                if (stringValue) {
                    return JSON.parse(stringValue, reviver)
                } else {
                    return new Map([])
                }
        }
    }, [])
    const [serverSideOptions, setServerSideOptions] = useState<Map<string, any>>(initialSetServerSideOptions()!)

    // синхронизация состояний serverSideOptions -> queryString | sessionStorage
    useEffect(() => {
        DEBUG && console.log(DEBUG_PREFIX, 'current serverSideOptions state', serverSideOptions)
        switch (mode) {
            case EUsePageStateMode.queryString:
                setSearchParams(new URLSearchParams([
                    ...Array.from(serverSideOptions).map((param) => [param[0], JSON.stringify(param[1], replacer)]),
                ]))
                return
            case EUsePageStateMode.sessionStorage:
                sessionStorage.setItem(sessionStorageKey, JSON.stringify(serverSideOptions, replacer))
                return
        }
    }, [serverSideOptions])

    useEffect(() => {
        if (varsBehaviorMap) {
            setProcessedParams(varsBehaviorMap(Object.fromEntries(serverSideOptions)))
        } else {
            setProcessedParams(Object.fromEntries(serverSideOptions))
        }
    }, [serverSideOptions])

    return {
        variables: processedParams,
        serverSideOptions,
        setServerSideOptions
    }
}