import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {
    Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
    TextField, IconButton, Tooltip, Paper, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, CircularProgress, Alert, Snackbar,
    Typography, TablePagination
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';

// 🔧 Конфигурация
const API_BASE = 'http://localhost:5000/api/v1/track/';
const ROWS_PER_PAGE_OPTIONS = [25, 50, 100];

// 🔐 Basic Auth хелпер (храните креды в sessionStorage для безопасности)
const getBasicAuthHeader = (): Record<string, string> => {
    const user = 'student';
    const pass = 'dvfu';
    if (!user || !pass) return {};
    const encoded = btoa(`${user}:${pass}`);
    return {Authorization: `Basic ${encoded}`};
};

// 🌐 Fetch-обёртка
const apiRequest = async (
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body?: object
): Promise<ApiResponse> => {
    const headers: Record<string, string> = {'Content-Type': 'application/json', ...getBasicAuthHeader()};
    const config: RequestInit = {method, headers};
    if (body) config.body = JSON.stringify(body);

    const response = await fetch(url, config);
    return response.json() as Promise<ApiResponse>;
};

// 📐 Типы
interface Track {
    id: number;
    name: string;
    composer: string | null;
    album_id: number | null;
    mediatype_id: number | null;
    genre_id: number | null;
    milliseconds: number | null;
    bytes: number | null;
    unit_price: string | number | null;
}

interface TrackFormData {
    name: string;
    composer: string;
    album_id: string;
    mediatype_id: string;
    genre_id: string;
    milliseconds: string;
    bytes: string;
    unit_price: string;
}

interface ApiResponse {
    success: boolean;
    tracks?: Track | Track[];
    errors?: string | Record<string, string[]>;
}

const getInitialFormData = (): TrackFormData => ({
    name: '', composer: '', album_id: '', mediatype_id: '', genre_id: '',
    milliseconds: '', bytes: '', unit_price: ''
});

export default function TrackManager() {
    const [tracks, setTracks] = useState<Track[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
        open: false, message: '', severity: 'success'
    });

    // Пагинация
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(50);

    // Формы/диалоги
    const [openForm, setOpenForm] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [activeTrack, setActiveTrack] = useState<Track | null>(null);
    const [formData, setFormData] = useState<TrackFormData>(getInitialFormData());

    // 📥 Загрузка
    const loadTracks = useCallback(async () => {
        setLoading(true);
        try {
            const res = await apiRequest(API_BASE);
            if (res.success) {
                setTracks(Array.isArray(res.tracks) ? res.tracks : []);
            } else {
                setSnackbar({
                    open: true,
                    message: typeof res.errors === 'string' ? res.errors : 'Ошибка загрузки',
                    severity: 'error'
                });
            }
        } catch {
            setSnackbar({open: true, message: 'Ошибка сети', severity: 'error'});
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadTracks();
    }, [loadTracks]);

    // ⚡ Мемоизированная пагинация (рендерится только видимый срез)
    const paginatedTracks = useMemo(() => {
        const start = page * rowsPerPage;
        return tracks.slice(start, start + rowsPerPage);
    }, [tracks, page, rowsPerPage]);

    const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
    const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };

    // 📝 Форма
    const handleOpenForm = (track: Track | null = null) => {
        setActiveTrack(track);
        if (track) {
            setFormData({
                name: track.name ?? '', composer: track.composer ?? '',
                album_id: String(track.album_id ?? ''), mediatype_id: String(track.mediatype_id ?? ''),
                genre_id: String(track.genre_id ?? ''), milliseconds: String(track.milliseconds ?? ''),
                bytes: String(track.bytes ?? ''), unit_price: String(track.unit_price ?? '')
            });
        } else {
            setFormData(getInitialFormData());
        }
        setOpenForm(true);
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name as keyof TrackFormData]: value}));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);

        const payload: Record<string, string | number | null> = {...formData};
        (['album_id', 'mediatype_id', 'genre_id', 'milliseconds', 'bytes'] as const).forEach(k => {
            payload[k] = payload[k] === '' ? null : parseInt(payload[k] as string, 10);
        });
        payload.unit_price = payload.unit_price === '' ? null : parseFloat(payload.unit_price as string);

        try {
            const res = activeTrack
                ? await apiRequest(`${API_BASE}/${activeTrack.id}/`, 'PUT', payload)
                : await apiRequest(API_BASE, 'POST', payload);

            if (res.success) {
                setSnackbar({open: true, message: activeTrack ? 'Обновлено' : 'Создано', severity: 'success'});
                setOpenForm(false);
                // При создании/обновлении не сбрасываем пагинацию, просто перезагружаем список
                loadTracks();
            } else {
                setSnackbar({
                    open: true,
                    message: typeof res.errors === 'string' ? res.errors : 'Ошибка валидации',
                    severity: 'error'
                });
            }
        } catch {
            setSnackbar({open: true, message: 'Ошибка отправки', severity: 'error'});
        } finally {
            setSubmitting(false);
        }
    };

    // 🗑️ Удаление
    const handleOpenDelete = (track: Track) => {
        setActiveTrack(track);
        setOpenDelete(true);
    };

    const handleConfirmDelete = async () => {
        if (!activeTrack) return;
        setSubmitting(true);
        try {
            const res = await apiRequest(`${API_BASE}/${activeTrack.id}/`, 'DELETE');
            if (res.success) {
                setSnackbar({open: true, message: 'Удалено', severity: 'success'});
                loadTracks();
                // Если удалили последнюю запись на странице, переходим назад
                if (paginatedTracks.length === 1 && page > 0) setPage(p => p - 1);
            } else {
                setSnackbar({
                    open: true,
                    message: typeof res.errors === 'string' ? res.errors : 'Ошибка удаления',
                    severity: 'error'
                });
            }
        } catch {
            setSnackbar({open: true, message: 'Ошибка сети', severity: 'error'});
        } finally {
            setSubmitting(false);
            setOpenDelete(false);
        }
    };

    const formatDuration = (ms: number | null | undefined): string => {
        if (!ms) return '—';
        const totalSec = Math.floor(ms / 1000);
        return `${Math.floor(totalSec / 60)}:${(totalSec % 60).toString().padStart(2, '0')}`;
    };

    return (
        <Box sx={{p: 3, maxWidth: 1200, mx: 'auto'}}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
                flexWrap: 'wrap',
                gap: 2
            }}>
                <Typography variant="h4" component="h1">Управление треками</Typography>
                <Box sx={{display: 'flex', gap: 1}}>
                    <Tooltip title="Обновить"><IconButton onClick={loadTracks}
                                                          disabled={loading}><RefreshIcon/></IconButton></Tooltip>
                    <Button variant="contained" startIcon={<AddIcon/>} onClick={() => handleOpenForm()}>Добавить
                        трек</Button>
                </Box>
            </Box>

            <TableContainer component={Paper} sx={{boxShadow: 3}}>
                <Table sx={{minWidth: 800}}>
                    <TableHead>
                        <TableRow>
                            {['ID', 'Название', 'Композитор', 'Album ID', 'Genre ID', 'Media Type ID', 'Длительность', 'Цена', 'Действия'].map(h => (
                                <TableCell key={h}>{h}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow><TableCell colSpan={9} align="center"><CircularProgress sx={{my: 4}}/></TableCell></TableRow>
                        ) : tracks.length === 0 ? (
                            <TableRow><TableCell colSpan={9} align="center">Нет данных</TableCell></TableRow>
                        ) : (
                            paginatedTracks.map(track => (
                                <TableRow key={track.id} hover>
                                    <TableCell>{track.id}</TableCell>
                                    <TableCell>{track.name}</TableCell>
                                    <TableCell>{track.composer ?? '—'}</TableCell>
                                    <TableCell>{track.album_id ?? '—'}</TableCell>
                                    <TableCell>{track.genre_id ?? '—'}</TableCell>
                                    <TableCell>{track.mediatype_id ?? '—'}</TableCell>
                                    <TableCell>{formatDuration(track.milliseconds)}</TableCell>
                                    <TableCell>{track.unit_price != null ? `$${parseFloat(String(track.unit_price)).toFixed(2)}` : '—'}</TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="Редактировать"><IconButton onClick={() => handleOpenForm(track)}
                                                                                   size="small"><EditIcon/></IconButton></Tooltip>
                                        <Tooltip title="Удалить"><IconButton onClick={() => handleOpenDelete(track)}
                                                                             color="error"
                                                                             size="small"><DeleteIcon/></IconButton></Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
                {!loading && tracks.length > 0 && (
                    <>
                        <TablePagination
                            component="div"
                            count={tracks.length}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
                            labelRowsPerPage="Строк на странице"
                        />
                        <TextField fullWidth label="Страница" name="page" type="number"
                                       value={page} onChange={(e)=>setPage(Number(e.target.value))}/>
                    </>

                )}
            </TableContainer>

            {/* Диалог формы */}
            <Dialog open={openForm} onClose={() => !submitting && setOpenForm(false)} fullWidth maxWidth="sm">
                <form onSubmit={handleSubmit}>
                    <DialogTitle>{activeTrack ? 'Редактировать трек' : 'Новый трек'}</DialogTitle>
                    <DialogContent dividers>
                        <Box sx={{display: 'grid', gap: 2, gridTemplateColumns: {xs: '1fr', sm: '1fr 1fr'}}}>
                            <TextField fullWidth label="Название" name="name" value={formData.name}
                                       onChange={handleFormChange} required/>
                            <TextField fullWidth label="Композитор" name="composer" value={formData.composer}
                                       onChange={handleFormChange} required/>
                            <TextField fullWidth label="Album ID" name="album_id" type="number"
                                       value={formData.album_id} onChange={handleFormChange}/>
                            <TextField fullWidth label="Genre ID" name="genre_id" type="number"
                                       value={formData.genre_id} onChange={handleFormChange}/>
                            <TextField fullWidth label="Media Type ID" name="mediatype_id" type="number"
                                       value={formData.mediatype_id} onChange={handleFormChange}/>
                            <TextField fullWidth label="Длительность (мс)" name="milliseconds" type="number"
                                       value={formData.milliseconds} onChange={handleFormChange}/>
                            <TextField fullWidth label="Размер (байт)" name="bytes" type="number" value={formData.bytes}
                                       onChange={handleFormChange}/>
                            <TextField fullWidth label="Цена" name="unit_price" type="number"
                                       value={formData.unit_price} onChange={handleFormChange}/>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenForm(false)} disabled={submitting}>Отмена</Button>
                        <Button type="submit" variant="contained" disabled={submitting}>
                            {submitting ? <CircularProgress size={24}/> : (activeTrack ? 'Сохранить' : 'Создать')}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

            {/* Диалог удаления */}
            <Dialog open={openDelete} onClose={() => !submitting && setOpenDelete(false)}>
                <DialogTitle>Подтверждение удаления</DialogTitle>
                <DialogContent><Typography>Удалить трек <b>{activeTrack?.name}</b>?</Typography></DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDelete(false)} disabled={submitting}>Отмена</Button>
                    <Button onClick={handleConfirmDelete} color="error" variant="contained" disabled={submitting}>
                        {submitting ? <CircularProgress size={24} color="inherit"/> : 'Удалить'}
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={snackbar.open} autoHideDuration={3000}
                      onClose={() => setSnackbar(s => ({...s, open: false}))}>
                <Alert severity={snackbar.severity}
                       onClose={() => setSnackbar(s => ({...s, open: false}))}>{snackbar.message}</Alert>
            </Snackbar>
        </Box>
    );
}