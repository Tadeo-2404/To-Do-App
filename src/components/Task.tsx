import '../styles/todos.css'
import { RiDeleteBin6Line, RiEditFill } from 'react-icons/ri';

interface Item {
    id: number,
    title: string,
    description: string,
    category: string,
    createdAt: string,
    dueHour: string,
    dueDate: string,
    priority: boolean,
    completed: boolean,
  }

export const Task = ({ id, title, description, completed, priority, dueDate, dueHour, category, createdAt }: Item) => {
    const dateWithoutTZ = dueDate.split('T')[0];
    return (
        <div key={id} className='todo_container'>
            <input type="radio" name="completed" id="completed" className='todo_input'/>
            <div>
                <div>
                    <h1 className='todo_title'>{title}</h1>
                    <div className='todo_subcontainer'>
                        <p>{category}</p>
                        <p>{description}</p>
                        <p>{dateWithoutTZ} - {dueHour}</p>
                    </div>
                </div>
                <div className='todo_buttons'>
                    <div className='todo_icon_edit'><RiEditFill /></div>
                    <div><RiDeleteBin6Line className='todo_icon_delete' /></div>
                </div>
            </div>
        </div>
    )
}
