import Modal from "./Modal"
import {useState} from 'react'
import './editTask.css'
import { doc, updateDoc } from "firebase/firestore";
import {db} from './firebase'

function EditTask({open, onClose, toEditDate, toEditTitle, toEditDescription, toEditMail, toEditContact, toEditSms, id}) {

  const [date, setDate] = useState(toEditDate)
  const [title, setTitle] = useState(toEditTitle)
  const [description, setDescription] = useState(toEditDescription)
  const [mail, setMail] = useState(toEditMail)
  const [contact, setContact] = useState(toEditContact)
  const [sms, setSms] = useState(toEditSms)


  /* function to update firestore */
  const handleUpdate = async (e) => {
    e.preventDefault()
    const taskDocRef = doc(db, 'tasks', id)
    try{
      await updateDoc(taskDocRef, {
        title: title,
        description: description
      })
      onClose()
    } catch (err) {
      alert(err)
    }
    
  }

  return (
    <Modal modalLable='Edit Task' onClose={onClose} open={open}>
      <form onSubmit={handleUpdate} className='editTask'>
        <input type='date' name='date' onChange={(e) => setDate(e.target.value)} value={date}/>
        <input type='text' name='title' onChange={(e) => setTitle(e.target.value.toUpperCase())} value={title}/>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
        <input type='email' name='mail' onChange={(e) => setMail(e.target.value.toLowerCase())} value={mail}/>
        <input type='number' name='contact' onChange={(e) => setContact(e.target.value)} value={contact}/>
        <input type='number' name='sms' onChange={(e) => setSms(e.target.value)} value={sms}/>
        <button type='submit'>Edit</button>
      </form> 
    </Modal>
  )
}

export default EditTask
