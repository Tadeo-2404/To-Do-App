"use client";
import React, { useEffect, useState } from 'react';
import { Task } from './Task';
import '../styles/todos.css'

interface Item {
  id: number,
  title: string,
  description: string,
  category: string,
  createdAt: string,
  dueHour: string,
  dueDate: string,
  priority: boolean,
  completed: boolean,
}

interface arguments {
  title: string,
  attribute: string,
  value: string
}

export default function Todos({attribute, value, title}: arguments) {
  const [data, setData] = useState<Item[]>([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/tasks?attribute=${attribute}&value=${value}`);
          const jsonData = await response.json();
          setData(jsonData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
   
      fetchData();
    }, []);

  return (
    <div>
      <h1>{title}</h1>
      <div className='todos_container'>
      {data.map((item) => (
        <Task
          key={item.id} 
          id={item.id}
          title={item.title}
          description={item.description}
          createdAt={item.createdAt}
          category={item.category}
          completed={item.completed}
          priority={item.priority}
          dueHour={item.dueHour}
          dueDate={item.dueDate}
        />
      ))}
      </div>
    </div>
  )
}
