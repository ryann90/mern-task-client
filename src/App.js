import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'
import Axios from 'axios'

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    // Note: original version from react
    // const res = await fetch('https://mern-practice-notetaking.herokuapp.com/tasks')
    // const data = await res.json()
    // return data

    // Note: axios version
    const data = await Axios.get("https://mern-practice-notetaking.herokuapp.com/tasks")
    .then((response) => {
      return response.data
    })
    .catch(() => {
      console.log("ERR")
    })

    return data

  }

  // get single task
  const fetchTask = async (id) => {
    // Note: original version from react
    // const res = await fetch('https://mern-practice-notetaking.herokuapp.com/tasks/${id}')
    // const data = await res.json()
    // return data

    // Note: axios version
    const data = await Axios.get(`https://mern-practice-notetaking.herokuapp.com/tasks/${id}`)
    .then((response) => {
      return response.data
    })
    .catch(() => {
      console.log("ERR")
    })

    return data

  }

  // Delete Task
  const deleteTask = async (id) => {
    // Note: original version from react
    // console.log('delete', id)
    // await fetch(`https://mern-practice-notetaking.herokuapp.com/tasks/deleteTask/${id}`, {
    //   method: 'DELETE'
    // })
    // setTasks(tasks.filter((task) => task._id !== id))

    // Note: axios version
    const deletedId = await Axios.delete(`https://mern-practice-notetaking.herokuapp.com/tasks/deleteTask/${id}`)
    .then((response) => {
      return response.data._id
    })
    .catch(() => {
      alert("something went wrong :(")
    })
    setTasks(tasks.filter((task) => task._id !== deletedId))
  }

  // Toggle Reminder
  // This will update the reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    // Note: original version from react
    // const res = await fetch(`http://localhost:9000/tasks/setReminder/${id}`, {
    //   method: 'PATCH',
    //   headers: {
    //     'Content-type': 'application/json'
    //   },
    //   body: JSON.stringify(updTask)
    // })
    // const data = await res.json()

    // Note: axios version
    const updatedReminder = await Axios.patch(`http://localhost:9000/tasks/setReminder/${id}`, updTask)
    .then((response) => {
      return response.data
    })
    .catch(() => {
      alert("something went wrong :(")
    })

    setTasks(
      tasks.map((task) =>
        task._id === id ? {
          // ...task, reminder: data.reminder
          ...task, reminder: updatedReminder.reminder
        } : task
      )
    )

  }

  // Add Task
  const addTask = async (task) => {
    // Note: original version
    // const res = await fetch('https://mern-practice-notetaking.herokuapp.com/tasks/addTask', {
    //   method: 'POST',
    //   headers: {
    //     'Content-type': 'application/json'
    //   },
    //   body: JSON.stringify(task)
    // })

    // const data = await res.json()
    // setTasks([...tasks, data])

    // Note: axios version
    const data = await Axios.post('https://mern-practice-notetaking.herokuapp.com/tasks/addTask', task)
    .then((response) => {
      return response.data
    })
    .catch(() => {
      alert("something went wrong :(")
    })

    setTasks([...tasks, data])
  }

  return (
    <Router>
      <div className="container">
        {/* You can use props to add title */}
        {/* <Header title="Hello World"/> */}

        {/* This will display your default title */}
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />

        <Route path='/' exact render={(props) => (
          <>
            {showAddTask && <AddTask onAdd={addTask} />}
            {tasks.length > 0 ?
                <Tasks
                  tasks={tasks}
                  onRemove={deleteTask}
                  onToggle={toggleReminder} />
                : 'No tasks to show'}
          </>
        )} />

        <Route path='/about' component={About} />
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
