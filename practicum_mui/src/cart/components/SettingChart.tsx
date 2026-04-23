import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {Divider, Radio, RadioGroup, Stack} from '@mui/material';

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
    isBar: boolean;
    setIsBar: React.Dispatch<
        React.SetStateAction<boolean>
    >;
};

function SettingChart({series, setSeries, isBar, setIsBar}: CheckboxProps) {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSeries({
            ...series,
            [event.target.name]: event.target.checked,
        });
    };

    const handleChangeRadio = () =>{
        setIsBar(!isBar)
    }

    return (
        <Stack
            direction="row"
            justifyContent="center"
            divider={<Divider orientation="vertical" flexItem/>}
            spacing={2}
            sx={{m: "20px 0"}}
        >
            <FormControl>
                <FormLabel id="label-radio-group">
                    Тип диаграммы:
                </FormLabel>
                <RadioGroup
                    name="group-radio"
                    value={(isBar) ? "bar" : "dot"}
                    onChange={handleChangeRadio}
                >
                    <FormControlLabel value="bar"
                                      control={
                                          <Radio checked={isBar}/>
                                      }
                                      label="Гистограмма"
                    />
                    <FormControlLabel value="dot"
                                      control={
                                          <Radio checked={!isBar}/>
                                      }
                                      label="Линейная"
                    />
                </RadioGroup>
            </FormControl>
            <FormControl>
                <FormLabel id="label-checkbox-group">
                    На диаграмме показать:
                </FormLabel>
                <FormControlLabel
                    control={
                        <Checkbox checked={series["max"]}
                                  name="max"
                                  onChange={handleChange}/>
                    }
                    label="Наибольшая длительность"
                />
                <FormControlLabel
                    control={
                        <Checkbox checked={series["avg"]}
                                  name="avg"
                                  onChange={handleChange}/>
                    }
                    label="Средняя"
                />
                <FormControlLabel
                    control={
                        <Checkbox checked={series["min"]}
                                  name="min"
                                  onChange={handleChange}/>
                    }
                    label="Наименьшая"
                />
            </FormControl>
        </Stack>
    )
}

export default SettingChart;