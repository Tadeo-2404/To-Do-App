"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Todos from "../components/Todos";
import '../styles/home.css'
import { FormNewTask } from '../components/FormNewTask';

interface categories {
  category: string
}

export default function Home() {
  const [types, setTypes] = useState<categories[]>([]);
  let counter = 0;

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('http://localhost:3000/api/rawQuery');
      const result = await data.json();
      setTypes(result);
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
                <div className='categories_container_item'>
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
