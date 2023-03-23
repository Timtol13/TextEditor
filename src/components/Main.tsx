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
    const [search, setSearch] = useState<string>()
    const [tags, setTags] = useState<string[]>([])
    useEffect(() => {
        setTasks(title? JSON.parse(title).reverse() : [])
    }, [])
    console.log(tasks)
    tasks?.map(task => {
        if(task?.tag !in tags) {
            setTags(e => [...e, task.tag])
        }
    })
    console.log(tags)
    return (
        <div>
            <div className={'tags'}>
            {tasks?.map(task => {
                if (task.tag) {
                    if (task?.tag ! in tags) {
                        setTags(e => [...e, task.tag])
                    }
                    return (
                        <div className={'btns'}>
                            <button
                                className={'btn'}
                                onClick={() => {setSearch(task.tag)}}>
                                {task.tag}
                            </button>
                            <button className={'btn w10'} onClick={() => {
                                tasks?.map(taskDel => {
                                    if(taskDel.tag === task.tag){
                                        return taskDel.tag = ""
                                    }
                                })
                                let value: Data[]
                                value = tasks
                                console.log(value)
                                localStorage.setItem('title', JSON.stringify(value))
                                }
                            }>X</button>
                        </div>
                    )
                }
            })}
            </div>
            <div className={'search_add'}>
                <input placeholder={'search by tag'} id={'search'} value={search} className={'search'} onChange={val => {setSearch(val.target.value)}} />
                <a type={'button'} className={'btn w10 green'} href={'/add'}>+</a>
            </div>
            {!search && tasks?.map(task => {
                return (
                    <div className={'task'}>
                        <div className={'tag'}>
                            Tag: <input type={'text'} placeholder={task.tag ? task.tag : 'empty'} onChange={e => {
                                task.tag = e.target.value
                                localStorage.setItem('title', JSON.stringify(tasks))
                            }
                            } />
                        </div>
                        <div className={'title'}>{task.title}</div>
                        <div className={'description'}><p>{task.description}</p></div>
                        <div className={'date'}>{task.date}</div>
                    </div>
                )
            })
            }
            {search && tasks?.map(task => {
                if (task.tag === search){
                    return (
                        <div className={'task'}>
                            <div className={'tag'}>
                                Tag: <input type={'text'} placeholder={task.tag ? task.tag : 'empty'} onChange={e => {
                                task.tag = e.target.value
                                localStorage.setItem('title', JSON.stringify(tasks))
                            }
                            } />
                            </div>
                            <div className={'title'}>{task.title}</div>
                            <div className={'description'}>{task.description}</div>
                            <div className={'date'}>{task.date}</div>
                        </div>
                    )
                }
            })}
        </div>
    )
}