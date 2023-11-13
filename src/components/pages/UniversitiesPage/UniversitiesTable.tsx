import {FC, useEffect} from "react";
import {AlexDataTable} from "../../AlexDataTable/AlexDataTable";
import {UniversitiesTableColumns} from "./columns";
import {useLazyUniversitiesQuery, useUniversityDeleteMutation} from "../../../redux/api/universities.api";
import {usePageState} from "../../functions/usePageState";
import {varsBehaviourMapUniversities} from "./varsBehaviourMapUniversities";
import {EPageType} from "../СustomizationPage/СustomizationPage";
import {useLocation} from "react-router-dom";

export const UniversitiesTable: FC = () => {
    const [lazyUniversitiesQuery, result] = useLazyUniversitiesQuery()
    const [deleteUniversity] = useUniversityDeleteMutation()

    const {
        variables,
        serverSideOptions,
        setServerSideOptions
    } = usePageState({
        varsBehaviorMap: varsBehaviourMapUniversities,
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
                       filterListIds={[
                           'universityGrade',
                       ]}
                       serverSideOptions={serverSideOptions}
                       setServerSideOptions={setServerSideOptions}
                       actionsConfig={{
                           view: {
                               columnName: 'id',
                               path: `./../${EPageType.view}`,
                               params: new URLSearchParams([
                                   ['from', JSON.stringify(location.pathname + location.search)]
                               ])
                           },
                           edit: {
                               columnName: 'id',
                               path: `./../${EPageType.edit}`,
                               params: new URLSearchParams([
                                   ['from', JSON.stringify(location.pathname + location.search)]
                               ])
                           },
                           delete: {
                               columnName: 'id',
                               mutation: deleteUniversity,
                               showModal: true
                           }
                       }}/>
    )
}