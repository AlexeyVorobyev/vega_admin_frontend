import {FC, useEffect} from "react";
import {CustomDataTable} from "../../CustomDataTable/CustomDataTable";
import {Stack} from "@mui/material";
import {UniversitiesTableColumns} from "./columns";
import {useLazyUniversitiesQuery} from "../../../redux/api/universities.api";
import {useLocation} from "react-router-dom";
import {usePageState} from "../../functions/usePageState";
import {varsBehaviourMapUniversities} from "./varsBehaviourMapUniversities";

export const UniversitiesTablePage: FC = () => {
    const [lazyUniversitiesQuery, result] = useLazyUniversitiesQuery()

    const {variables} = usePageState({
        varsBehaviorMap: varsBehaviourMapUniversities
    })

    useEffect(() => {
        variables && lazyUniversitiesQuery(variables)
    }, [variables])

    useEffect(() => {
        console.log(result)
    }, [result])

    const location = useLocation()

    return (
        <Stack height={'100%'} width={'100%'} direction={'column'} spacing={2}>
            <CustomDataTable columns={UniversitiesTableColumns}
                             data={result?.currentData?.content}
                             availablePages={result?.currentData?.totalPages}
                             actionsConfig={{
                                 view: {
                                     columnName: 'id',
                                     path: `${location.pathname}/view`
                                 }
                             }}/>
        </Stack>
    )
}