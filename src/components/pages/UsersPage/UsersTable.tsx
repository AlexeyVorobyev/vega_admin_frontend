import {FC, useEffect} from "react";
import {AlexDataTable} from "../../AlexDataTable/AlexDataTable";
import {usePageState} from "../../functions/usePageState";
import {EPageType} from "../СustomizationPage/СustomizationPage";
import {useLocation} from "react-router-dom";
import {UsersTableColumns} from "./columns";
import {useLazyUsersQuery} from "../../../redux/api/users.api";
import {varsBehaviourMapUsers} from "./varsBehaviourMapUsers";

export const UsersTable: FC = () => {
    const [lazyUsersQuery, result] = useLazyUsersQuery()

    const {
        variables,
        serverSideOptions,
        setServerSideOptions
    } = usePageState({
        varsBehaviorMap: varsBehaviourMapUsers
    })

    useEffect(() => {
        variables && lazyUsersQuery(variables)
    }, [variables])

    const location = useLocation()

    return (
        <AlexDataTable columns={UsersTableColumns}
                       data={result?.currentData?.content}
                       availablePages={result?.currentData?.totalPages}
                       perPageOptions={['1', '2', '4', '8', '16', '32', '64', '128']}
                       availableElements={result?.currentData?.totalElements}
                       columnsSelect footer downloadCSV
                       serverSideOptions={serverSideOptions}
                       setServerSideOptions={setServerSideOptions}
                       filterListIds={[
                           'userRole',
                       ]}
                       actionsConfig={{
                           view: {
                               columnName: 'id',
                               path: `./../${EPageType.view}`,
                               params: new URLSearchParams([
                                   ['from', JSON.stringify(location.pathname + location.search)]
                               ])
                           },
                       }}/>
    )
}