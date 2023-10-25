import Modal from "./Modal"
import './taskItem.css'

function TaskItem({onClose, open, title, description, date}) {

  return (
    <Modal modalLable='Task Item' onClose={onClose} open={open}>
      <div className='taskItem'>
        <h3>{date}</h3>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </Modal>
  )
}

export default TaskItem
