import {FC, useEffect} from "react";
import {CustomDataTable} from "../../CustomDataTable/CustomDataTable";
import {Stack} from "@mui/material";
import {UniversitiesTableColumns} from "./columns";
import {useLazyUniversitiesQuery, useUniversityDeleteMutation} from "../../../redux/api/universities.api";
import {useLocation} from "react-router-dom";
import {usePageState} from "../../functions/usePageState";
import {varsBehaviourMapUniversities} from "./varsBehaviourMapUniversities";

export const UniversitiesTablePage: FC = () => {
    const [lazyUniversitiesQuery, result] = useLazyUniversitiesQuery()
    const [deleteUniversity] = useUniversityDeleteMutation()

    const {variables} = usePageState({
        varsBehaviorMap: varsBehaviourMapUniversities
    })

    useEffect(() => {
        variables && lazyUniversitiesQuery(variables)
    }, [variables])

    const location = useLocation()

    return (
        <Stack height={'100%'} width={'100%'} direction={'column'} spacing={2}>
            <CustomDataTable columns={UniversitiesTableColumns}
                             data={result?.currentData?.content}
                             availablePages={result?.currentData?.totalPages}
                             perPageOptions={['1', '2', '4', '8', '16', '32']}
                             actionsConfig={{
                                 view: {
                                     columnName: 'id',
                                     path: `${location.pathname}/view`
                                 },
                                 edit: {
                                     columnName: 'id',
                                     path: `${location.pathname}/edit`
                                 },
                                 delete: {
                                     columnName: 'id',
                                     mutation:deleteUniversity,
                                     showModal:true
                                 }
                             }}/>
        </Stack>
    )
}