import {FC, useEffect} from "react";
import {CustomDataTable} from "../../CustomDataTable/CustomDataTable";
import {Stack} from "@mui/material";
import {UniversitiesTableColumns} from "./columns";
import {useLazyUniversitiesQuery} from "../../../redux/api/universities.api";

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

export const UniversitiesTablePage: FC = () => {
    const [lazyUniversitiesQuery, result] = useLazyUniversitiesQuery()

    useEffect(() => {
        lazyUniversitiesQuery({page:0,size:10})
    },[])

    useEffect(() => {
        console.log(result)
    },[result])

    return (
        <Stack height={'100%'} width={'100%'} direction={'column'} spacing={2}>
            <CustomDataTable columns={UniversitiesTableColumns} data={mockData || []}/>
        </Stack>
    )
}