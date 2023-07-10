import '../styles/todos.css';
import { useState } from 'react';
import { RiDeleteBin6Line, RiEditFill } from 'react-icons/ri';

interface Item {
    id: number,
    title: string,
    description: string,
    category: string,
    createdAt: string,
    dueDate: string,
    priority: boolean,
    completed: boolean,
}

export const Task = ({ id, title, description, completed, priority, dueDate, category, createdAt }: Item) => {
    const [checkedInput, setCheckedInput] = useState(completed);

    const setChecked = () => {
        setCheckedInput(!checkedInput)
    }

    const dateWithoutTZ = dueDate.split('T');
    return (
        <div key={id} className={`todo_container ${completed ? "task_completed" : "task_uncompleted"}`}>
            <input
                type="checkbox"
                name="completed"
                id="completed"
                className='todo_input'
                checked={completed ? true : undefined}
                onClick={setChecked}
            />

            <div>
                <div>
                    <h1 className='todo_title'>{title}</h1>
                    <div className='todo_subcontainer'>
                        <p>{description}</p>
                        <p>{dateWithoutTZ[0]} - {dateWithoutTZ[1]} </p>
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
