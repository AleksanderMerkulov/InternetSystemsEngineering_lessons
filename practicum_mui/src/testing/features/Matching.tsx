import {Grid, List, ListItem, ListItemButton, ListItemText} from '@mui/material';
import {tTasks} from "../quizData"
import SortableList from "./SortableList";
import {useEffect, useMemo} from "react";
import {useDispatch} from "react-redux";
import {addList} from "./quizSlice";

interface ComponentProps {
    tasks: tTasks;
    index: number;
}

function shuffle<T>(array: T[]): T[] {
    const arr = [...array] // не мутируем оригинал
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
}

function Matching({tasks, index}: ComponentProps) {

    const answers = useMemo(() => {
        return shuffle(tasks).map(el => el.answer)
    }, [tasks])



    const dispatch = useDispatch();

    // Добавляем список ответов очередного задания в хранилище
    useEffect(() => {
        dispatch(addList({index, items: answers}));
    }, [dispatch, index, answers]);


    return (
        <Grid container spacing={2}>
            <Grid size={6}>
                <List>
                    {tasks.map((item, index) => (
                        <ListItem key={index}>
                            <ListItemButton
                                sx={{
                                    border: '1px solid gray',
                                    borderRadius: '5px',
                                    textAlign: 'right',
                                }}>
                                <ListItemText primary={item.question}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Grid>

            <Grid size={6}>
                <SortableList answers={answers} index={index}/>
            </Grid>
        </Grid>
    );
}

export default Matching