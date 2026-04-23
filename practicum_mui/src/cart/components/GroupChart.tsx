import Container from '@mui/material/Container';
import {BarChart} from '@mui/x-charts/BarChart';
import {tGroup} from "../groupdata";
import React from "react";
import SettingChart from "./SettingChart";
import {LineChart} from "@mui/x-charts";

type GroupProps = {
    data: tGroup;
};

type tSeries = {
    avg: true,
    max: false,
    min: false,
    title: false,
}

type CheckboxProps = {
    series: tSeries;
    setSeries: React.Dispatch<
        React.SetStateAction<tSeries>
    >;
};

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

function GroupChart({data}: propsInterface) {

    const [isBar, setIsBar] = React.useState(true);

    const [series, setSeries] = React.useState<tSeries>({
        avg: true,
        max: false,
        min: false,
        title: false,
    });

    const activeSeriesCount = Object.values(series).filter(Boolean).length;

    const seriesY = Object.entries(series)
        .filter(([_, isEnabled]) => isEnabled)
        .map(([key]) => ({
            dataKey: key,
            label: key,
            barLabel: activeSeriesCount === 1 ? ('value' as const) : undefined,
        }));

    const chartSetting = {
        yAxis: [{label: 'Time'}],
        height: 400,
    }

    return (
        <Container maxWidth="lg">

            {!isBar?<LineChart
                dataset={data.slice(0, 5)}
                xAxis={[{scaleType: 'band', dataKey: 'title'}]}
                series={seriesY}
                slotProps={{
                    legend: {
                        position: {vertical: 'bottom', horizontal: 'center'},
                    },
                }}
                {...chartSetting}
            />:null}

            {isBar?<BarChart
                dataset={data.slice(0, 5)}
                xAxis={[{scaleType: 'band', dataKey: 'title'}]}
                series={seriesY}
                slotProps={{
                    legend: {
                        position: {vertical: 'bottom', horizontal: 'center'},
                    },
                }}

                {...chartSetting}
            />:null}
            <SettingChart series={series} setSeries={setSeries} isBar={isBar} setIsBar={setIsBar}/>
        </Container>
    )
}

export default GroupChart;