import React, {useState} from 'react'
import {useFormik} from "formik";
import './Add.scss'
import {useNavigate} from "react-router-dom";

export type Data = {
    tag: string,
    title: string,
    description: string,
    date: string
}

export const Add = () => {
    let date = new Date()
    const nav = useNavigate()
    let [allData, setData] = useState<Data[]>([])
    const formik = useFormik({
        initialValues: {
            tag: '',
            title: '',
            description: '',
            date: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
        },
        onSubmit: (values: Data) => {
            let title = localStorage.getItem('title')
            let value: Data
            value = values
            allData = title? JSON.parse(title) : []
            const newData = [...allData, value];
            localStorage.setItem('title', JSON.stringify(newData))
            return nav('/')
        }
    })
    return (
        <div className={'add'}>
            <form onSubmit={formik.handleSubmit}>
                <input placeholder={'Tag'} maxLength={15} className={'element tag'} {...formik.getFieldProps('tag')} />
                <input type={"text"} className={'element title'} placeholder={"Enter title"} {...formik.getFieldProps('title')} />
                <textarea placeholder={"Enter description"} className={'element description'} {...formik.getFieldProps('description')} ></textarea>
                <button type={"submit"} className={'element btn'} >Submit</button>
            </form>
        </div>
    )
}