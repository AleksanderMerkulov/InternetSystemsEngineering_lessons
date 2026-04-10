export type tTasks = {
    "question": string; /* вопрос задания*/
    "answer": string; /* ответ задания*/
}[]

export type tQuizzes = {
    "id": number,
    "type": "M" | "S", /* типы заданий, М - сопоставление*/
    "title": string, /* формулировка задания */
    "tasks": tTasks,
}[];

export const quiz: tQuizzes = [
    {
        "id": 1,
        "type": "M",
        "title": "Сопоставьте сооружение  и город, в котором оно расположено.",
        "tasks": [
            {
                "question": "Башня Аль-Хамра",
                "answer": "Кувейт"
            },
            {
                "question": "Башня CITIC",
                "answer": "Гуанчжоу"
            },
            {
                "question": "Телебашня «Коктобе»",
                "answer": "Алматы"
            },
            {
                "question": "Си-Эн Тауэр",
                "answer": "Торонто"
            },
        ]
    },
    {
        "id": 2,
        "type": "M",
        "title": "Сопоставьте сооружение  и его высоту.",
        "tasks": [
            {
                "question": "Tokyo Skytree",
                "answer": "634"
            },
            {
                "question": "Бурдж-Халифа",
                "answer": "838"
            },
            {
                "question": "Эмпайр-стейт-билдинг",
                "answer": "448.7"
            },
            {
                "question": "Останкинская башня",
                "answer": "540.1"
            },
            {
                "question": "Lotte World Tower",
                "answer": "555"
            },
        ]
    }
]