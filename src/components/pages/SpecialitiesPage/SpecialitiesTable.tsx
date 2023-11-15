import {FC, useEffect} from "react";
import {AlexDataTable} from "../../AlexDataTable/AlexDataTable";
import {SpecialitiesTableColumns} from "./columns";
import {usePageState} from "../../functions/usePageState";
import {EPageType} from "../СustomizationPage/СustomizationPage";
import {useLocation} from "react-router-dom";
import {varsBehaviourMapSpecialities} from "./varsBehaviourMapSpecialities";
import {useLazySpecialitiesQuery, useSpecialityDeleteMutation} from "../../../redux/api/specialities.api";

export const SpecialitiesTable: FC = () => {
    const [lazySpecialitiesQuery, result] = useLazySpecialitiesQuery()
    const [deleteSpeciality] = useSpecialityDeleteMutation()

    const {
        variables,
        serverSideOptions,
        setServerSideOptions
    } = usePageState({
        varsBehaviorMap: varsBehaviourMapSpecialities,
        defaultValue: new Map([
            ['educationLevel','MASTER'],
        ])
    })

    useEffect(() => {
        variables && lazySpecialitiesQuery(variables)
    }, [variables])

    const location = useLocation()

    return (
        <AlexDataTable columns={SpecialitiesTableColumns}
                       data={result?.currentData?.content}
                       availablePages={result?.currentData?.totalPages}
                       perPageOptions={['1', '2', '4', '8', '16', '32']}
                       availableElements={result?.currentData?.totalElements}
                       columnsSelect simpleFilter footer
                       filterListIds={[
                           'educationLevel',
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
                               mutation: deleteSpeciality,
                               showModal: true
                           }
                       }}/>
    )
}