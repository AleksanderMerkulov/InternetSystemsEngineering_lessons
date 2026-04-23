import GroupGrid from "./components/GroupGrid";
import {countries, tGroup, types, years} from "./groupdata";
import {Box, FormControl, InputLabel, LinearProgress, MenuItem, Select, Typography} from "@mui/material";
import Container from "@mui/material/Container";
import React, {useEffect} from "react";
import Navbar from "../components/Navbar";
import GroupChart from "./components/GroupChart";
import Footer from "../components/Footer";

type TimeType = {
    "avg": number,
    "max": number,
    "min": number,
    "title": string
}[]

function Chart() {

    const [group, setGroup] = React.useState('')
    const [loading, setLoading] = React.useState(true)
    const [data, setData] = React.useState<TimeType>([
        {
            "avg": 0,
            "max": 0,
            "min": 0,
            "title": ''
        }
    ])

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Подставляем group прямо в URL
                const response = await fetch(`http://localhost:5000/api/v1/aggregate/${group}`);
                const result = await response.json();

                // Предполагаем, что API возвращает объект с полем tracks или данными напрямую
                setData(result.data || result);
            } catch (error) {
                console.error("Ошибка загрузки:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [group]);

    const handleChange = (event: { target: { value: any; }; }) => {
        const name = event.target.value
        setGroup(name);
    }


    return (
        <>
            <Container maxWidth="lg">
                <Navbar active={"3"}/>
                {loading?<LinearProgress aria-label="Loading…" />:null}
                <Box sx={{width: "200px", m: "auto", pt: '20px'}}>
                    <FormControl fullWidth>
                        <Box sx={{marginLeft: 'auto', marginRight: 'auto', width: 'fit-content'}}>
                            <InputLabel>Группировка по</InputLabel>
                            <Select
                                label="Группировать по"
                                id="demo-simple-select"
                                value={group}
                                onChange={handleChange}
                                variant={'outlined'}>
                                <MenuItem value={'artist'} selected>Артистам</MenuItem>
                                <MenuItem value={'album'}>Альбомам</MenuItem>
                                <MenuItem value={'genre'}>Типам</MenuItem>
                            </Select>
                        </Box>
                    </FormControl>
                </Box>
                {
                    group === ''?
                        <>
                            <Typography variant="h4" component="h4" textAlign={'center'} sx={{paddingTop: '0.5em'}}>
                                Выберите по кому группировать
                            </Typography>
                        </>:
                        <>
                            <GroupChart data={data}/>
                            <GroupGrid data={data}/>
                        </>
                }
            </Container>
            <Footer/>
        </>
    )
}

export default Chart