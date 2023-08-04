"use client"
import Swal from 'sweetalert2'
import { useState } from 'react';
import { obtenerFechaActual, obtenerFechaLimite } from '../utils/helpers';
import { crearTask } from '../app/lib/task/api_task';
import { useContextValue } from '../context/TaskContext';
import { CustomButton } from './custom/CustomButton';
import AddIcon from '@mui/icons-material/Add';
import { useMediaQuery, useTheme } from '@mui/material';
import { Checkbox, FormControlLabel, TextField } from '@mui/material';

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
    const { render, setRender } = useContextValue();
    const [titulo, setTitulo] = useState("");
    const [fecha, setFecha] = useState("");
    const [categoria, setCategoria] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [prioridad, setPrioridad] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
        if(response.status < 300) {
            Swal.fire({
                title: 'Tarea creada',
                text: 'Se ha creado tu tarea exitosamente',
                icon: 'success',
                confirmButtonText: 'De acuerdo'
            })
            setRender(render+1);
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
                    <section className={isMobile ? 'section_container_mobile' : 'section_container'}>
                        <div className='input_titulo_container'>
                            <TextField label="titulo" variant="standard" type='text' id='titulo' name='titulo' onChange={event => setTitulo(event.target.value)}/>
                        </div>
                        <div className='input_categoria_container'>
                            <TextField label="categoria" variant="standard" type='text' id='categoria' name='categoria' onChange={event => setCategoria(event.target.value)} />
                        </div>
                        <div className='input_descripcion_container'>
                            <TextField label="descripcion" variant="standard" type='text' id='descripcion' name='descripcion' onChange={event => setDescripcion(event.target.value)}/>
                        </div>
                        <div className='input_fecha_container'>
                            <input type="datetime-local" name="fecha" id="fecha" placeholder='fecha' className='input_fecha' onChange={event => setFecha(event.target.value)}/>
                        </div>
                        <div className='input_prioridad_container'>
                           <FormControlLabel control={<Checkbox/>} label="Prioridad" />
                        </div>
                    </section>
                    <CustomButton text='crear' variant='contained' type="submit" endIcon={<AddIcon/>}/>
                </fieldset>
            </form>
        </div>
    )
}
