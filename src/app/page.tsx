"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Todos from "../components/Todos";
import '../styles/home.css'
import { FormNewTask } from '../components/FormNewTask';
import axios from 'axios';

interface categories {
  category: string
}

export default function Home() {
  const [types, setTypes] = useState<categories[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/rawQuery');
        const result = response.data;
        setTypes(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div>
        <h1>Bienvenido, aqui puedes visualizar tus tareas, para agregar una da click en nuevo</h1>
        <div className='home_container'>
          <div>
            <FormNewTask />
          </div>
          <div className='categories_container'>
            <h1 className='categories_main_title'>tus categorias</h1>
            <div className='categories_container_list'>
              {types.map((item) => (
                <div className='categories_container_item' key={item.category}>
                  <Link href={`/categorias/${item.category}`}>
                    <p>{item.category}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="container_todos">
          <Todos attribute={"completed"} value={"false"} title={"Pendiente"} limit={3} addBtn={true} />
          <Todos attribute={"completed"} value={"true"} title={"Completado"} limit={3} addBtn={true} />
          <Todos attribute={"priority"} value={"true"} title={"Prioridad"} limit={3} addBtn={true} />
        </div>
      </div>
    </div>
  );
}
