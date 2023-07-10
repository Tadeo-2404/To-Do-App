"use client"
import { useState } from 'react';
import '../styles/formNewTask.css'
import axios from 'axios'
import { obtenerFechaActual, obtenerFechaLimite } from '../utils/helpers';
import moment from 'moment';

interface NewTaskData {
  title: string;
  description?: string;
  category?: string;
  createdAt?: string;
  dueDate?: string;
  priority: boolean;
  completed: boolean;
}
  
export const FormNewTask = () => {
    const [titulo, setTitulo] = useState("");
    const [fecha, setFecha] = useState("");
    const [categoria, setCategoria] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [prioridad, setPrioridad] = useState(false);

    const data: NewTaskData = {
        title: titulo,
        description: descripcion || undefined,
        category: categoria || undefined,
        createdAt: obtenerFechaActual(),
        dueDate: fecha || obtenerFechaLimite(),
        priority: prioridad,
        completed: false
      };
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(data);

        try {
            const response = await axios.post('http://localhost:3000/api/tasks', data, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                } 
            });
            console.log(response);
        } catch (error) { 
            console.log(error);
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
