"use client";
import React, { useEffect, useState } from 'react';
import { Task } from './Task';
import '../styles/todos.css'

interface Item {
  id: number;
  title: string;
  description: string,
  completed: boolean,
  priority: boolean,
  date: string
}

export default function Todos() {
  const [data, setData] = useState<Item[]>([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/tasks');
          const jsonData = await response.json();
          console.log(jsonData);
          setData(jsonData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);

  return (
    <div>
      <h1>My Todos</h1>
      <div className='todos_container'>
      {data.map((item) => (
        <Task
          key={item.id} 
          id={item.id}
          title={item.title}
          description={item.description}
          completed={item.completed}
          priority={item.priority}
          date={item.date}
        />
      ))}
      </div>
    </div>
  )
}
