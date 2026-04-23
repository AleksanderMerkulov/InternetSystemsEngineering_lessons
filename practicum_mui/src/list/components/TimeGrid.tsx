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

function TrackGrid({ data }: propsInterface) {

    const rows: GridRowsProp = data['tracks'];
    const columns: GridColDef[] = [
        {field: 'name', headerName: 'Название трека'},
        {field: 'composer', headerName: 'Композитор'},
        {field: 'milliseconds', headerName: 'Время (мс)'},
        {field: 'bytes', headerName: 'Вес файла (в байтах)'},
        {field: 'unit_price', headerName: 'Цена в $'},
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
export default TrackGrid;