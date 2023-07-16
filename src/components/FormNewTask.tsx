"use client"
import Swal from 'sweetalert2'
import '../styles/formNewTask.css'
import { useState } from 'react';
import { obtenerFechaActual, obtenerFechaLimite } from '../utils/helpers';
import { crearTask } from '../app/lib/task/api_task';

//interface que contiene el formato del objeto Task
interface NewTaskData {
  title: string;
  description?: string;
  category?: string;
  createdAt?: string;
  dueDate?: string;
  priority: boolean;
  completed: boolean;
}

//interface que contiene el formato de respuesta
interface Response {
    status: number
}

//funcion que mandar a llamar crearTask que realiza una peticion API
const crear = async (task: NewTaskData) => {
    const response : Response = await crearTask(task);
    return response; //retorna respuesta
}
 
//componente FormNewTask
export const FormNewTask = () => {
    const [titulo, setTitulo] = useState("");
    const [fecha, setFecha] = useState("");
    const [categoria, setCategoria] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [prioridad, setPrioridad] = useState(false);

    //objeto con los datos del formulario
    const data: NewTaskData = {
        title: titulo,
        description: descripcion || undefined,
        category: categoria || undefined,
        createdAt: obtenerFechaActual(),
        dueDate: fecha || obtenerFechaLimite(),
        priority: prioridad,
        completed: false
    };

    //handleSubmit cuando se envia el formulario
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await crear(data); //mandamos a llamar la funcion crear y le pasamos el objeto data

        //validacion de respuestas
        if(response.status === 200) {
            Swal.fire({
                title: 'Tarea creada',
                text: 'Se ha creado tu tarea exitosamente',
                icon: 'success',
                confirmButtonText: 'De acuerdo'
            })
        } else if(response.status > 300){
            Swal.fire({
                title: 'Error',
                text: 'No se ha podido crear tu tarea :(',
                icon: 'error',
                confirmButtonText: 'De acuerdo'
            })
        }
    };

    return (
        <div>
            <form action="/" method="post" className="form_container" onSubmit={handleSubmit}>
                <fieldset className='form_fieldset'>
                    <legend className='form_legend'>crear task</legend>
                    <section className='section_container'>
                        <div className='input_titulo_container'>
                            <input type="text" name="titulo" id="titulo" placeholder='titulo' required className='input_titulo' onChange={event => setTitulo(event.target.value)}/>
                        </div>
                        <div className='input_categoria_container'>
                            <input type="text" name="categoria" id="categoria" placeholder='categoria' className='input_categoria'onChange={event => setCategoria(event.target.value)}/>
                        </div>
                        <div className='input_descripcion_container'>
                            <input type="text" name="descripcion" id="fecha" placeholder='descripcion' className='input_descripcion' onChange={event => setDescripcion(event.target.value)}/>
                        </div>
                        <div className='input_fecha_container'>
                            <input type="datetime-local" name="fecha" id="fecha" placeholder='fecha' className='input_fecha' onChange={event => setFecha(event.target.value)}/>
                        </div>
                        <div className='input_prioridad_container'>
                            <label htmlFor="prioridad">prioridad</label>
                            <input type="checkbox" name="prioridad" id="prioridad" className='input_prioridad' onChange={event => setPrioridad(!prioridad)}/>
                        </div>
                    </section>
                    <input type="submit" value="crear" className='input_form_submit'/>
                </fieldset>
            </form>
        </div>
    )
}
