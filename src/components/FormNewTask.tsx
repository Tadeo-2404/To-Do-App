"use client"
import { useState } from 'react';
import '../styles/formNewTask.css'

export const FormNewTask = () => {
    const [titulo, setTitulo] = useState("");
    const [categoria, setCategoria] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [fecha, setFecha] = useState("");
    const [prioridad, setPrioridad] = useState(false);

    const handleSubmit = () => {
    }

    return (
        <div>
            <form action="/" method="post" className="form_container" onSubmit={handleSubmit}>
                <fieldset className='form_fieldset'>
                    <legend className='form_legend'>crear task</legend>
                    <section className='section_container'>
                        <div className='input_titulo_container'>
                            <input type="text" name="titulo" id="titulo" placeholder='titulo' required className='input_titulo'/>
                        </div>
                        <div className='input_categoria_container'>
                            <input type="text" name="categoria" id="categoria" placeholder='categoria' required className='input_categoria'/>
                        </div>
                        <div className='input_descripcion_container'>
                            <input type="text" name="descripcion" id="fecha" placeholder='descripcion' className='input_descripcion'/>
                        </div>
                        <div className='input_fecha_container'>
                            <input type="datetime-local" name="fecha" id="fecha" placeholder='fecha' className='input_fecha'/>
                        </div>
                        <div className='input_prioridad_container'>
                            <label htmlFor="prioridad">prioridad</label>
                            <input type="checkbox" name="prioridad" id="prioridad" className='input_prioridad'/>
                        </div>
                    </section>
                    <input type="submit" value="crear" className='input_form_submit'/>
                </fieldset>
            </form>
        </div>
    )
}
