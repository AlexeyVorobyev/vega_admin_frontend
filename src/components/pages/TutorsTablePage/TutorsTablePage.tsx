import {FC} from "react";
import {AlexDataTable} from "../../AlexDataTable/AlexDataTable";
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
            <AlexDataTable columns={TutorsTableColumns} data={mockData || []}/>
        </Stack>
    )
}