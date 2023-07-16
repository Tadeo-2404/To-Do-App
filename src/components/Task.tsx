import '../styles/todos.css';
import { useState } from 'react';
import { RiDeleteBin6Line, RiEditFill } from 'react-icons/ri';
import { eliminarTask } from '../app/lib/task/api_task';
import Swal from 'sweetalert2'

//interface para Item
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

//interface para Response de API
interface Response {
    status: number
}

//funcion que elimina un task
const eliminar = async (id: number, title: string) => {
    //mensaje para eliminar task
    Swal.fire({
      title: `Deseas eliminar el task "${title}"?`,
      text: 'Esta accion no se puede revertir',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
        //si el task se elimino correctamente
      if (result.isConfirmed) {
        const response : Response = await eliminarTask(id);
        if(response.status) {
            Swal.fire({
                title: 'Tarea eliminada',
                text: 'Se ha eliminado tu tarea exitosamente',
                icon: 'success',
                confirmButtonText: 'De acuerdo'
            })
        }
      }
    });
  }  

export const Task = ({ id, title, description, completed, priority, dueDate, category, createdAt }: Item) => {
    const [checkedInput, setCheckedInput] = useState(completed);

    //onchange para checkbox 
    const setChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
      setCheckedInput(event.target.checked);
    }
  
    const dateWithoutTZ = dueDate.split('T');
  
    return (
      <div key={id} className={`todo_container ${completed ? "task_completed" : "task_uncompleted"}`}>
        <input
          type="checkbox"
          name="completed"
          id="completed"
          className='todo_input'
          checked={checkedInput}
          onChange={setChecked}
        />
        <div>
          <div>
            <h1 className='todo_title'>{title}</h1>
            <div className='todo_subcontainer'>
              <p>{description}</p>
              <p>{dateWithoutTZ[0]} - {dateWithoutTZ[1]}</p>
            </div>
          </div>
          <div className='todo_buttons'>
              <div className='todo_icon_edit'><RiEditFill /></div>
              <div onClick={() => eliminar(id, title)}><RiDeleteBin6Line className='todo_icon_delete' /></div>
          </div>
        </div>
      </div>
    );
  }
  