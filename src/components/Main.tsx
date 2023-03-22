import React, {useEffect, useState} from 'react'
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import './Main.scss'
import {Add, Data} from "./add/Add";

export const Main = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path={'/add'} element={<Add />} />
                    <Route path={'/'} element={<Tasks />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export const Tasks = () => {
    const title = localStorage.getItem('title')
    const [tasks, setTasks] = useState<Data[]>()
    useEffect(() => {
        setTasks(title? JSON.parse(title).reverse() : [])
    }, [])
    return (
        <div>
            {tasks?.map(task => {
                return (
                    <div className={'task'}>
                        <div className={'title'}>{task.title}</div>
                        <div className={'description'}>{task.description}</div>
                        <div className={'date'}>{task.date}</div>
                    </div>
                )
            })}
        </div>
    )
}