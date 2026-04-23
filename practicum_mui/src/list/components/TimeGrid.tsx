import buildings from "../table";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { ruRU } from '@mui/x-data-grid/locales';
import Container from "@mui/material/Container";

interface Track {
    id: number;
    name: string;
    composer: string;
    milliseconds: number;
    bytes: number;
    unit_price: string;
    // добавьте остальные поля по необходимости
}

// 2. Описываем структуру объекта data
interface DataShape {
    success: boolean;
    tracks: Track[];
}

// 3. Указываем этот тип в пропсах
interface propsInterface {
    data: DataShape;
}

function TimeGrid({ data }: propsInterface) {

    // const rows: GridRowsProp = buildings;
    // const columns: GridColDef[] = [
    //     {field: 'Название', headerName: 'Название'},
    //     {field: 'Тип'},
    //     {field: 'Страна'},
    //     {field: 'Город',},
    //     {field: 'Год'},
    //     {field: 'Высота'},
    // ];
    const rows: GridRowsProp = data['tracks'];
    console.log(data['tracks'])
    const columns: GridColDef[] = [
        {field: 'name', headerName: 'Название'},
        {field: 'composer'},
        {field: 'milliseconds'},
        {field: 'bytes',},
        {field: 'unit_price'},
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
export default TimeGrid;