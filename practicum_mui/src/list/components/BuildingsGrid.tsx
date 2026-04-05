import buildings from "../table";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { ruRU } from '@mui/x-data-grid/locales';
import Container from "@mui/material/Container";

function BuildingsGrid() {
  const rows: GridRowsProp = buildings;
  const columns: GridColDef[] = [
    { field: 'Название', headerName: 'Название'},
    { field: 'Тип'},
    { field: 'Страна'},
    { field: 'Город',},
    { field: 'Год' },
    { field: 'Высота'},
  ];

  return (
    <Container maxWidth="lg" sx={{height: '700px', mt: '20px'}}>
     <DataGrid
       localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
       rows={rows}
       columns={columns}
       showToolbar={true}
    />
   </Container>
   );
}
export default BuildingsGrid;