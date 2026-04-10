import {Box, Button, Container, Link, Typography} from '@mui/material';
import {quiz, tTasks} from "../quizData";
import Matching from "./Matching";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import React, {useState} from "react";
import {Link as RouterLink} from "react-router";


function Quiz() {

    const answers = useSelector((state: RootState) => state.lists.lists);

    const quizzes_answers = quiz.map(item => {
        return item.tasks.map(task => task.answer)
    })

    const [success, setSuccess] = useState([0, 0])
    const [isChecked, setIsChecked] = useState(false)
    const [restartKey, setRestartKey] = useState(0)

    // const [isUpdate, setIsUpdate] = useState(false)

    function handleChange() {
        const success = quizzes_answers.map((success_answers, arr_index) => {
            let counter = 0
            success_answers.forEach((s_answer, index) => {
                if (s_answer === answers[arr_index][index]) {
                    counter += 1
                }
            })
            return counter
        })
        setSuccess(success)
        setIsChecked(true)

    }

    function handleRestart() {
        setRestartKey(prev => prev + 1)
        setIsChecked(false)
        setSuccess([0, 0])
    }

    const Results = () => {
        return (
            <Box>
                <Typography align={'center'}>
                    Задание 1. {success[0] === 4 ? 'Все ответы верны' : `Верных ответов:${success[0]}`}
                </Typography>
                <Typography align={'center'}>
                    Задание 2. {success[1] === 4 ? 'Все ответы верны' : `Верных ответов:${success[1]}`}
                </Typography>
            </Box>
        )
    }

    return (
        <Container maxWidth="md">
            {quiz.map((item, index) => (
                <Box key={item.id} component="section" sx={{m: 2, p: 2}}>
                    <Typography variant="h5" gutterBottom>
                        {index + 1}. {item.title}
                    </Typography>
                    <Matching tasks={item.tasks} index={index} key={`${item.id}-${restartKey}`}/>
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