import {FC, useEffect} from "react";
import {CustomDataTable} from "../../CustomDataTable/CustomDataTable";
import {Stack} from "@mui/material";
import {UniversitiesTableColumns} from "./columns";
import {useLazyUniversitiesQuery} from "../../../redux/api/universities.api";
import {useLocation} from "react-router-dom";
import {usePageState} from "../../functions/usePageState";
import {varsBehaviourMapUniversities} from "./varsBehaviourMapUniversities";

const mockData = [
    {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        title: "string",
        shortTitle: "string",
        description: "string",
        address: "string",
        site: "string",
        town: {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            title: "string"
        },
        grade: "HIGH",
        cardPhoto: "string",
        priority: 0,
        studentsTelegramChatUrl: "string"
    }
]

const mockDataMulti = new Array(...(function* () {
    for (let i = 0; i < 20; i++) yield mockData[0]
})())
console.log(mockDataMulti)

export const UniversitiesTablePage: FC = () => {
    const [lazyUniversitiesQuery, result] = useLazyUniversitiesQuery()

    const {variables} = usePageState({
        varsBehaviorMap:varsBehaviourMapUniversities
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
            <CustomDataTable columns={UniversitiesTableColumns} data={mockDataMulti || []}
                             actionsConfig={{
                                 view: {
                                     columnName:'id',
                                     path:`${location.pathname}/view`
                                 }
                             }}/>
        </Stack>
    )
}