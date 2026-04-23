import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TrackGrid from "./components/TimeGrid";
import {useEffect, useState} from "react";
import {Typography} from "@mui/material";

function List() {

    const [data, setData] = useState({
        success: true,
        tracks: []
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/v1/track/');
                const json = await response.json();

                // 3. Сохраняем полученные данные в state
                setData(json);
            } catch (error) {
                console.error("Ошибка при загрузке:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Navbar active="2"/>
            <Typography variant="h4" component="h4" textAlign={'center'} sx={{paddingTop:'0.5em'}}>
                Таблица треков
            </Typography>
            <TrackGrid data={data}/>
            <Footer/>
        </div>
    );
}

export default List;