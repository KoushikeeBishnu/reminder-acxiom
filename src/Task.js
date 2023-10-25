import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState } from 'react';
import EditTask from './EditTask';
import TaskItem from './TaskItem';
import { db } from './firebase';
import './task.css';

function Task({id, date, mail, contact, sms, recur, title, description, completed}) {

  const [checked, setChecked] = useState(completed)
  const [open, setOpen] = useState({edit:false, view:false})

  const handleClose = () => {
    setOpen({edit:false, view:false})
  }

  /* function to update firestore */
  const handleChange = async () => {
    const taskDocRef = doc(db, 'tasks', id)
    try{
      await updateDoc(taskDocRef, {
        completed: checked
      })
    } catch (err) {
      alert(err)
    }
  }

  /* function to delete a document from firstore */ 
  const handleDelete = async () => {
    const taskDocRef = doc(db, 'tasks', id)
    try{
      await deleteDoc(taskDocRef)
    } catch (err) {
      alert(err)
    }
  }

  return (
    <div className={`task ${checked && 'task--borderColor'}`}>
      <div>
        <input 
          id={`checkbox-${id}`} 
          className='checkbox-custom'
          name="checkbox" 
          checked={checked}
          onChange={handleChange}
          type="checkbox" />
        <label 
          htmlFor={`checkbox-${id}`} 
          className="checkbox-custom-label" 
          onClick={() => setChecked(!checked)} ></label>
      </div>
      <div className='task__body'>
        
        <h2>{title}</h2>
        <p>{description}</p>
        <h2>{mail}</h2>
        <h2>{contact}</h2>
        <h2>{sms}</h2>
        <p>{recur}</p>
        <div className='task__buttons'>
          <div className='task__deleteNedit'>
            <button 
              className='task__editButton' 
              onClick={() => setOpen({...open, edit : true})}>
              Edit
            </button>
            <button className='task__deleteButton' onClick={handleDelete}>Delete</button>
          </div>
          <button 
            onClick={() => setOpen({...open, view: true})}>
            View
          </button>
        </div>
      </div>

      {open.view &&
        <TaskItem 
          onClose={handleClose} 
          date={date}
          title={title} 
          description={description}
          mail={mail}
          contact={contact}
          sms={sms}
          recur={recur}
          open={open.view} />
      }

      {open.edit &&
        <EditTask 
          onClose={handleClose} 
          toEditDate={date}
          toEditTitle={title} 
          toEditDescription={description} 
          toEditMail={mail}
          toEditContact={contact}
          toEditSms={sms}
          toEditRecur={recur}
          open={open.edit}
          id={id} />
      }

    </div>
  )
}

export default Task