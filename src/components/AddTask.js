import { useState } from 'react'
import Button from './Button'
import { FaTimes } from 'react-icons/fa'

const AddTask = ({ onAdd }) => {
    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)
    const [arr, setArr] = useState([])
    const [name, setName] = useState({
        given: "",
        last: ""
    })

    const [arrObj, setArrObj] = useState([
        {
            relation: "",
            number: 0
        }
    ])

    const [mFruits, setMFruits] = useState([
        {
            fruitName: 'Orange',
            isChecked: false
        },
        {
            fruitName: 'Apple',
            isChecked: false
        },
        {
            fruitName: 'Mango',
            isChecked: false
        },
        {
            fruitName: 'Lemon',
            isChecked: false
        }
    ])

    const onSubmit = (e) => {
        e.preventDefault()

        if (!text) {
            alert('Please add a task')
            return
        }

        onAdd({ text, day, reminder, arr, name, arrObj})

        //clear
        setText('')
        setDay('')
        setReminder(false)
        setArr([])
        setMFruits(mFruits.map(
            fruit => {
                fruit.isChecked = false
                return fruit
            }
        ))
        setArrObj([
            {
                relation: "",
                number: 0
            }
        ])
    }

    const addForm = (e) => {
        e.preventDefault()
        setArrObj([
            ...arrObj,
            {
                relation: "",
                number: 0
            }
        ])
    }

    const onRemove = (index) => {
        const values = [...arrObj]
        values.splice(index, 1)
        setArrObj(values)
    }

    const handleChangeEvent = (index, event) => {
        const values = [...arrObj];
        values[index][event.target.name] = event.target.name === "number" ? parseInt(event.target.value) : event.target.value
        setArrObj(values)
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>

            <div className='form-control'>
                <label>Task</label>
                <input
                    type='text'
                    placeholder='Add Task'
                    value={text}
                    onChange={(e) => setText(e.target.value)} />
            </div>

            <div className='form-control'>
                <label>Day & Time</label>
                <input
                    type='text'
                    placeholder='Add Day & Time'
                    value={day}
                    onChange={(e) => setDay(e.target.value)} />
            </div>

            <div className='form-control form-control-check'>
                <label>Set Reminder</label>
                <input
                    type='checkbox'
                    checked={reminder}
                    value={reminder}
                    onChange={(e) => setReminder(e.currentTarget.checked)} />
            </div>

            <div className='form-control'></div>

            <h4>Select Fruits</h4>
            <>
                {mFruits.map((fruit, index) => (
                    <div className='form-control-check' key={index}>
                        <label>{fruit.fruitName}</label>
                        <input
                            type='checkbox'
                            checked={fruit.isChecked}
                            value={fruit.isChecked}
                            onChange={
                                (event) => {
                                    let checked = event.currentTarget.checked
                                    setMFruits(mFruits.map((myFruit, myIndex) => {
                                        if (myIndex === index) {
                                            myFruit.isChecked = checked
                                            setArr(checked === true ? [...arr, myFruit.fruitName] : arr.filter(filteredFruit => filteredFruit !== myFruit.fruitName))
                                        }
                                        return myFruit
                                    }))
                                }
                            } />
                    </div>
                ))}
            </>

            <div className='form-control'>
                <label>First Name</label>
                <input
                    type='text'
                    placeholder='First Name'
                    value={name.given}
                    onChange={(e) => setName({ ...name, given: e.currentTarget.value })} />
            </div>

            <div className='form-control'>
                <label>Last Name</label>
                <input
                    type='text'
                    placeholder='Last Name'
                    value={name.last}
                    onChange={(e) => setName({ ...name, last: e.currentTarget.value })} />
            </div>

            <Button
                // you are passing color with the value of green
                color='green'
                // you are passing text with the value of Add
                text='Add Form'
                // you are passing an onClick event name onClick
                onClick={addForm} />

            <>
                {
                    arrObj.map((obj, index) =>
                        <div className='form-control' key={index}>
                            <FaTimes
                                style={{ color: 'red', cursor: 'pointer' }}
                                onClick={() => onRemove(index)}
                            />

                            <input
                                name="relation"
                                type='text'
                                placeholder='Relation'
                                value={obj.relation}
                                onChange={(event) => handleChangeEvent(index, event)}
                            />

                            <input
                                name="number"
                                type='number'
                                placeholder='Number'
                                value={obj.number}
                                onChange={(event) => handleChangeEvent(index, event)} />
                        </div>
                    )
                }
            </>

            <input type='submit' value='Save Task' className='btn btn-block' />
        </form>
    )
}

export default AddTask
