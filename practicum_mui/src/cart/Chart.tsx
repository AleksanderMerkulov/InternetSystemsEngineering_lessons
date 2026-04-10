import GroupGrid from "./components/GroupGrid";
import {countries, tGroup, types, years} from "./groupdata";
import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import Container from "@mui/material/Container";
import React from "react";
import Navbar from "../components/Navbar";
import GroupChart from "./components/GroupChart";
import Footer from "../components/Footer";

function Chart() {

    const [group, setGroup] = React.useState('countries')
    const [data, setData] = React.useState<tGroup>(countries)

    const handleChange = (event: { target: { value: any; }; }) => {
        const name = event.target.value
        setGroup(name);
        switch (name) {
            case 'countries':
                setData(countries)
                break
            case 'years':
                setData(years)
                break
            case 'types':
                setData(types)
                break
            default:
                setData(countries)
        }
    }


    return (
        <>
            <Container maxWidth="lg">
                <Navbar active={"3"}/>

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
                                <MenuItem value={'countries'}>Странам</MenuItem>
                                <MenuItem value={'years'}>Годам</MenuItem>
                                <MenuItem value={'types'}>Типу</MenuItem>
                            </Select>
                        </Box>
                    </FormControl>
                </Box>
                <GroupChart data={data}/>
                <GroupGrid data={data}/>
            </Container>
            <Footer/>
        </>
    )
}

export default Chart