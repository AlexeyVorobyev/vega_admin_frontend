import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";

interface IProps {
    varsBehaviorMap?: (params: any) => any
}

export const usePageState = ({
                                 varsBehaviorMap
                             }: IProps) => {

    const [searchParams] = useSearchParams()
    const [processedParams, setProcessedParams] = useState<any | null>(null)

    useEffect(() => {
        const resObj: any = {}
        const arr = Array.from(searchParams.entries())
        arr.map((item) => {
            resObj[item[0]] = item[1]
        })

        if (varsBehaviorMap) {
            setProcessedParams(varsBehaviorMap(resObj))
        } else {
            setProcessedParams(resObj)
        }
    }, [searchParams])

    return {
        variables: processedParams
    }
}