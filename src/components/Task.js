import React from 'react'
import { FaTimes } from 'react-icons/fa'

const Task = ({ task, onRemove, onToggle }) => {
    return (
        <div
            className={`task ${task.reminder ? 'reminder' : ''}`}
            onDoubleClick={ () => onToggle(task._id) }
        >
            <h3>{task.text}
                <FaTimes
                    style={{ color: 'red', cursor: 'pointer' }}
                    onClick={() => onRemove(task._id)}
                />
            </h3>
            <p>{task.day}</p>
            {/* this is an example of data within an object */}
            <p>Name: {task.name.last}, {task.name.given}</p>
            {/* this is an example of data map inside an array */}
            <>
                {task.arr.map((a, index) => (
                    <p key={index}>{a + " index value = " + index}</p>
                ))}
            </>
            {/* this is an example of data of array object */}
            <>
                {task.arrObj.map((x, index) => (
                    <div key={index}>
                        <p>{x.relation}</p>
                        <p>Some number = {x.number}</p>
                    </div>
                ))}
            </>
        </div>
    )
}

export default Task
