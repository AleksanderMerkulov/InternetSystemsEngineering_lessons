import {tGroup} from "../groupdata";
import {DataGrid, GridColDef, GridRowsProp} from "@mui/x-data-grid";
import buildings from "../../list/table";
import Container from "@mui/material/Container";
import {ruRU} from "@mui/x-data-grid/locales";

type TimeType = {
    "avg": number,
    "max": number,
    "min": number,
    "title": string
}

// 2. Описываем структуру объекта data

// 3. Указываем этот тип в пропсах
interface propsInterface {
    data: TimeType[];
}


function GroupGrid({data}: propsInterface) {
    const rows: GridRowsProp = data;
    const columns: GridColDef[] = [
        {field: 'title', headerName: 'Название'},
        {field: 'min', headerName: 'Наименьшая длительность'},
        {field: 'avg', headerName: 'Средняя длительность'},
        {field: 'max', headerName: 'Наибольшая длительность'},
    ];

    return (
        <Container maxWidth="lg" sx={{height: '700px', mt: '20px'}}>

            <DataGrid
                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                rows={rows}
                columns={columns}
                getRowId={(row) => row.title}
                // showToolbar={true}
            />
        </Container>
    );
}

export default GroupGrid