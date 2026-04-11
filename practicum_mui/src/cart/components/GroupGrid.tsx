import {tGroup} from "../groupdata";
import {DataGrid, GridColDef, GridRowsProp} from "@mui/x-data-grid";
import buildings from "../../list/table";
import Container from "@mui/material/Container";
import {ruRU} from "@mui/x-data-grid/locales";

type GroupProps = {
    data: tGroup;
};

function GroupGrid({data}: GroupProps) {
    const rows: GridRowsProp = data;
    const columns: GridColDef[] = [
        {field: 'id', },
        {field: 'Группа', headerName: 'Группа'},
        {field: "Минимальная высота"},
        {field: "Максимальная высота"},
        {field: "Средняя высота",},
    ];

    return (
        <Container maxWidth="lg" sx={{height: '700px', mt: '20px'}}>

            <DataGrid
                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                rows={rows}
                columns={columns}
                // showToolbar={true}
            />
        </Container>
    );
}

export default GroupGrid