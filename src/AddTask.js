import Modal from "./Modal"
import {useState} from 'react'
import './addTask.css'
import {db} from './firebase'
import {collection, addDoc, Timestamp} from 'firebase/firestore'

function AddTask({onClose, open}) {

  const [date, setDate] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [mail, setMail] = useState('')
  const [contact, setContact] = useState('')
  const [sms, setSms] = useState('')
  const [recur, setRecur] = useState('')

  /* function to add new task to firestore */
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, 'tasks'), {
        date:date,
        title: title,
        description: description,
        mail:mail,
        contact : contact ,
        sms  : sms   ,
        recur    : recur,
        completed: false,
        created: Timestamp.now()
      })
      onClose()
    } catch (err) {
      alert(err)
    }
  }

  return (
    <Modal modalLable='Add Task' onClose={onClose} open={open}>
      <form onSubmit={handleSubmit} className='addTask' name='addTask'>
      <input 
          type='date' 
          name='date' 
          onChange={(e) => setDate(e.target.value)} 
          value={date}
          />
        <input 
          type='text' 
          name='title' 
          onChange={(e) => setTitle(e.target.value.toUpperCase())} 
          value={title}
          placeholder='Enter title'/>
        <textarea 
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Enter task decription'
          value={description}></textarea>
          <input 
          type='mail' 
          name='mail' 
          onChange={(e) => setMail(e.target.value.toLowerCase())} 
          value={mail}
          placeholder='Enter email address'/>
          <input 
          type='number' 
          name='contact' 
          onChange={(e) => setContact(e.target.value)} 
          value={contact}
          placeholder='Enter contact number'/>
          <input 
          type='number' 
          name='sms' 
          onChange={(e) => setSms(e.target.value)} 
          value={sms}
          placeholder='Enter sms number'/>
         
        <button type='submit'>Done</button>
      </form> 
    </Modal>
  )
}

export default AddTask
