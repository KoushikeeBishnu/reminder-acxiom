import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { useEffect, useState } from 'react'
import AddTask from './AddTask'
import Task from './Task'
import { db } from './firebase'
import './taskManager.css'


function TaskManager({ userId, onLogout }) {

  const [openAddModal, setOpenAddModal] = useState(false)
  const [tasks, setTasks] = useState([])

  /* function to get all tasks from firestore in realtime */ 
  useEffect(() => {
    const taskColRef = query(collection(db, 'tasks'), orderBy('created', 'desc'))
    onSnapshot(taskColRef, (snapshot) => {
      setTasks(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  },[])
  
  const [value, setValue] = useState("");
  const handleLogout = () => {
      localStorage.clear();   
      window.location.reload()
  };

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  return (
    <div className='taskManager'>
      {/* <header>REMEMBER ME</header> */}
      {/* NAVBAR */}
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand nav-name" href="#">REMEMBER ME</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        {/* <li class="nav-item">
          <a class="nav-link" href="#">Remainder</a>
        </li> */}
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Remainder Options
          </a>
          <ul class="dropdown-menu nav-center">
            <li><a class="dropdown-item" href="#">Set Remainder</a></li>
            <li><a class="dropdown-item" href="#">Modify  Remainder</a></li>
            <li><a class="dropdown-item" href="#">Enable  Remainder</a></li>
            <li><a class="dropdown-item" href="#">Disable  Remainder</a></li>
            <li><a class="dropdown-item" href="#">Delete  Remainder</a></li>
            {/* <li><hr class="dropdown-divider"/></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li> */}
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" aria-disabled="true">Contact Us</a>
        </li>
      </ul>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search Remainder" aria-label="Search"/>
        <button class="btn" style={{width:"6rem"}} type="submit">Search</button>
      </form>
      <button className="btn solid bg-danger" onClick={handleLogout}>Logout</button>
    </div>
  </div>
</nav>
      {/* NAVBAR END */}
      <div className='taskManager__container'>
        <h1 className='text-center'>Welcome {userId}</h1>
        <h3 id='date' className='text-center p-5'>Today is {date}</h3>
        <button 
          onClick={() => setOpenAddModal(true)}>
          Add task +
        </button>
        <div className='taskManager__tasks'>

          {tasks.map((task) => (
            <Task
              id={task.id}
              key={task.id}
              completed={task.data.completed}
              date={task.data.date}
              title={task.data.title} 
              description={task.data.description}
            />
          ))}

        </div>
      </div>

      {openAddModal &&
        <AddTask onClose={() => setOpenAddModal(false)} open={openAddModal}/>
      }

    </div>
  )
}

export default TaskManager