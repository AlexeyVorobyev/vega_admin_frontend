import {FC} from "react";
import {CustomDataTable} from "../../CustomDataTable/CustomDataTable";
import {Stack} from "@mui/material";
import {TutorsTableColumns} from "./columns";

const mockData = [
    {
        name:'123'
    }
]

export const TutorsTablePage: FC = () => {

    return (
        <Stack height={'100%'} width={'100%'} direction={'column'} spacing={2}>
            <CustomDataTable columns={TutorsTableColumns} data={mockData || []}/>
        </Stack>
    )
}