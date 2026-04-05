import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css'; /* изменить путь */
import App from './App';
import reportWebVitals from './reportWebVitals';

import List from "./list/List";
import Main from "./main/Main";
import Chart from "./cart/Chart";

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router";
import Building from "./building/Building";


const router = createBrowserRouter([
    {
        path: "",
        element: <Main/>,
    },
    {
        path: "/list",
        element: <List/>,
    },
    {
        path: "/building/:id",
        element: <Building />,
    },
    {
        path: "/chart",
        element: <Chart/>,
    },
]);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);

reportWebVitals();