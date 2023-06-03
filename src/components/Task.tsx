import '../styles/todos.css'
import { RiDeleteBin6Line, RiEditFill } from 'react-icons/ri';

interface Item {
    id: number;
    title: string;
    description: string,
    completed: boolean,
    priority: boolean,
    date: string
}

export const Task = ({ id, title, description, completed, priority, date }: Item) => {
    console.log(id);
    return (
        <div key={id} className='todo_container'>
            <h1 className='todo_title'>{title}</h1>
            <div className='todo_subcontainer'>
              <p>{description}</p>
              <p>{date}</p>
            </div>
            <div className='todo_buttons'>
                <div className='todo_icon_edit'><RiEditFill/></div>
                <div><RiDeleteBin6Line className='todo_icon_delete'/></div>
            </div>
        </div>
    )
}
