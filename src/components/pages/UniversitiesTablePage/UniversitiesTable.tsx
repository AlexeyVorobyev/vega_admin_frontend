import {FC, useEffect} from "react";
import {AlexDataTable} from "../../AlexDataTable/AlexDataTable";
import {UniversitiesTableColumns} from "./columns";
import {useLazyUniversitiesQuery, useUniversityDeleteMutation} from "../../../redux/api/universities.api";
import {useLocation} from "react-router-dom";
import {usePageState} from "../../functions/usePageState";
import {varsBehaviourMapUniversities} from "./varsBehaviourMapUniversities";
import {EPageType} from "../СustomizationWrapperPage/СustomizationWrapperPage";

export const UniversitiesTable: FC = () => {
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
        <AlexDataTable columns={UniversitiesTableColumns}
                       data={result?.currentData?.content}
                       availablePages={result?.currentData?.totalPages}
                       perPageOptions={['1', '2', '4', '8', '16', '32']}
                       availableElements={result?.currentData?.totalElements}
                       columnsSelect simpleFilter footer
                       actionsConfig={{
                             view: {
                                 columnName: 'id',
                                 path: `${location.pathname}/${EPageType.view}`
                             },
                             edit: {
                                 columnName: 'id',
                                 path: `${location.pathname}/${EPageType.edit}`
                             },
                             delete: {
                                 columnName: 'id',
                                 mutation: deleteUniversity,
                                 showModal: true
                             }
                         }}/>
    )
}