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
    'Максимальная высота': boolean,
    'Средняя высота': boolean,
    'Минимальная высота': boolean,
}

type CheckboxProps = {
    series: tSeries;
    setSeries: React.Dispatch<
        React.SetStateAction<tSeries>
    >;
};

function GroupChart({data}: GroupProps) {

    const [isBar, setIsBar] = React.useState(true);

    const [series, setSeries] = React.useState({
        'Максимальная высота': true,
        'Средняя высота': false,
        'Минимальная высота': false,
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
        yAxis: [{label: 'Высота (м)'}],
        height: 400,
    }

    return (
        <Container maxWidth="lg">

            {!isBar?<LineChart
                dataset={data}
                xAxis={[{scaleType: 'band', dataKey: 'Группа'}]}
                series={seriesY}
                slotProps={{
                    legend: {
                        position: {vertical: 'bottom', horizontal: 'center'},
                    },
                }}
                {...chartSetting}
            />:null}

            {isBar?<BarChart
                dataset={data}
                xAxis={[{scaleType: 'band', dataKey: 'Группа'}]}
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