import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TimeGrid from "./components/TimeGrid";
import {useEffect, useState} from "react";

function List() {

    const [stats, setStats] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/v1/track/');
                const json = await response.json();

                // 3. Сохраняем полученные данные в state
                setStats(json);
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
            <TimeGrid/>
            <Footer/>
        </div>
    );
}

export default List;