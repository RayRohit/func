import React, { useEffect, useState } from 'react'
import './Todo.css'
import axios from 'axios'
import { AiTwotoneDelete } from 'react-icons/ai'
import { MdDoneAll } from 'react-icons/md'

export default function Todo() {
    const [todo, setTodo] = useState({
        todo_item: '',complete:false
    })
    const [data, setData] = useState(null)
    const url = "http://localhost:3000/Todo"
    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        setTodo({ ...todo, [name]: value })
    }
    const handleClick = (e) => {
        if (todo.todo_item === '') {
            alert('Please fill the input field')
        }
        else {
            try {
                axios.post('http://localhost:3000/Todo', todo).then((res) => {
                    console.log(res.data)
                    setTodo({ todo_item: '' })
                    window.location.reload()
                }).catch((err) => console.log(err))
            } catch (err) {
                console.log(err)
            }
        }
    }
    useEffect(() => {
        try {
            axios.get('http://localhost:3000/Todo').then((res) => setData(res.data)).catch((err) => console.log(err))
        } catch (err) {

        }
    }, [])
    const handleDelete = (item) => {
        try {
            axios.delete(`${url}/${item.id}`).then((res) => {
                console.log(res.data)
                window.location.reload()
            }).catch((err) => console.log(err))
        }
        catch (err) {
            console.log(err)
        }
    }
    const handleComplete = (item) => {
        const { id } = item
        let mapped = data.map(task => {
            return task.id === id ? { ...task, complete: !task.complete } : { ...task };
        });
        setData(mapped);
    }
    return (
        <div className='todo'>
            <div className='container-fluid'>
                <div className='row py-5 d-flex justify-content-center'>
                    <div className='col-sm-4'>
                        <label htmlFor='todo_item' className='fw-bolder fs-4 py-3 text-white'>TO-DO</label>
                        <div className='d-flex'>
                            <input type='text' className='form-control fw-bold' name='todo_item' value={todo.todo_item} onChange={handleChange} />
                            <button className='btn btn-danger mx-3 text-white px-4' onClick={() => handleClick()}>submit</button>
                        </div>
                        <div className='py-3'>

                            {data !== null ?
                                <>
                                    {
                                        data.map((item) => {
                                            return (
                                                <>
                                                    <div key={item.id} className="shadow bg-white rounded p-2 mt-4 me-3 text-uppercase fw-bold d-flex justify-content-between">
                                                        <h5 className={item.complete ? 'complete' : 'd-flex align-items-end'}
                                                        ><em>{item.todo_item}</em></h5>
                                                        <span>
                                                            <button className='btn btn-danger' onClick={() => handleDelete(item)}><AiTwotoneDelete /></button>
                                                            <button className='btn btn-success mx-3' onClick={() => handleComplete(item)}><MdDoneAll /></button>
                                                        </span>
                                                    </div>
                                                </>
                                            )
                                        })
                                    }
                                </>
                                :
                                null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
