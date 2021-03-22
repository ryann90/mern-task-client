import Task from './Task'
const Tasks = ({ tasks, onRemove, onToggle }) => {

    return (
        <>
            {tasks.map((task) =>
                <Task
                    key={task._id}
                    task={task}
                    onRemove={onRemove}
                    onToggle={onToggle}/>
            )}
        </>
    )
}

export default Tasks
