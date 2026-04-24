import {Box, Button, Container, LinearProgress, Link, TextField, Typography} from '@mui/material';
import {quiz, tTasks} from "../quizData";
import Matching from "./Matching";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import React, {useEffect, useState} from "react";
import {Link as RouterLink} from "react-router";
import {addList} from "./quizSlice";
import TextAnswer from "../components/TextAnswer";

type tQuizzes = {
    "id": number,
    "type": "M" | "S", /* типы заданий, М - сопоставление*/
    "title": string, /* формулировка задания */
    "tasks": tTasks,
}[];

function Quiz() {

    const dispatch = useDispatch();

    const [quiz, setQuiz] = useState<tQuizzes>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/v1/aggregate/test/');
                const json = await response.json();

                // 3. Сохраняем полученные данные в state
                setQuiz(json.data);
            } catch (error) {
                console.error("Ошибка при загрузке:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    const answers = useSelector((state: RootState) => state.lists.lists);

    const [success, setSuccess] = useState([0,0,0,0,0,0,0,0,0])
    const [isChecked, setIsChecked] = useState(false)
    const [restartKey, setRestartKey] = useState(0)

    if (!Array.isArray(quiz)){
        return (
            <>
                {/*<h1>Данные не были получены</h1>*/}
            </>
        )
    }

    const quizzes_answers = quiz.map(item => {
        return item.tasks.map(task => task.answer)
    })

    // const [isUpdate, setIsUpdate] = useState(false)

    function handleChange() {
        const success = quizzes_answers.map((success_answers, arr_index) => {
            let counter = 0;

            // Проверяем, есть ли вообще ответы для этого блока заданий в сторе
            const currentStoreAnswers = answers[arr_index];

            success_answers.forEach((s_answer, index) => {
                // Добавляем проверку: существует ли массив и конкретный ответ в нем
                if (currentStoreAnswers && s_answer === currentStoreAnswers[index]) {
                    counter += 1;
                }
            });
            return counter;
        });

        setSuccess(success);
        setIsChecked(true);
    }

    function handleRestart() {
        setRestartKey(prev => prev + 1)
        setIsChecked(false)
        setSuccess([0, 0])
    }

    const Results = () => (
        <Box sx={{mt: 2}}>
            {success.map((count, i) => (
                <Typography key={i} align={'center'}>
                    Задание {i + 1}. Верно: {count} из {quiz[i].tasks.length}
                </Typography>
            ))}
        </Box>
    );

    return (
        <Container maxWidth="md">
            {loading?<LinearProgress aria-label="Loading…" />:null}
            {quiz.map((item, index) => (
                <Box key={item.id} component="section" sx={{m: 2, p: 2, border: '1px solid #eee'}}>
                    <Typography variant="h5" gutterBottom>
                        {index + 1}. {item.title}
                    </Typography>

                    {/* Условие по типу задания */}
                    {item.type === 'M' ? (
                        <Matching
                            tasks={item.tasks}
                            index={index}
                            key={`M-${item.id}-${restartKey}`}
                        />
                    ) : (
                        // Тип 'S' - Текстовые вопросы
                        item.tasks.map((task, taskIndex) => (
                            <Box key={taskIndex} sx={{my: 1}}>
                                <Typography>{task.question}</Typography>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    placeholder="Введите ответ"
                                    value={answers[index]?.[taskIndex] || ''}
                                    onChange={(e) => {
                                        // Создаем копию текущего ряда ответов
                                        const updatedRow = [...(answers[index] || [])];
                                        updatedRow[taskIndex] = e.target.value;

                                        // Диспатчим обновленный ряд в стор
                                        dispatch(addList({index: index, items: updatedRow}));
                                    }}
                                />
                            </Box>
                        ))
                    )}
                </Box>
            ))}


            <Box sx={{display: 'flex', justifyContent: 'space-around'}}>
                <Button variant="contained"
                        onClick={handleChange}
                >Проверить</Button>
                <Button variant="contained" onClick={handleRestart}>
                    Начать снова
                </Button>
            </Box>
            {
                isChecked ? <Results/> : null
            }
            {/*    отладка вывода */}
            {/*<div>*/}
            {/*    {JSON.stringify(quizzes_answers)}*/}
            {/*    {JSON.stringify(success)}*/}
            {/*</div>*/}
        </Container>

    );
}

export default Quiz