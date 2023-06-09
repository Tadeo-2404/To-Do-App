"use client";
import React, { useEffect, useState } from 'react';
import { Task } from './Task';
import Link from 'next/link';
import '../styles/todos.css'
import axios from 'axios';

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

interface arguments {
  title: string,
  attribute: string | null,
  value: string | null,
  limit: number | null,
  addBtn: boolean
}

export default function Todos({ attribute, value, title, limit, addBtn }: arguments) {
  const [data, setData] = useState<Item[]>([]);
  const [type, setType] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `http://localhost:3000/api/tasks?attribute=${attribute}&value=${value}`;
        if (limit) {
          url += `&limit=${limit}`;
        }
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div>
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
              dueDate={item.dueDate}
            />
          ))}
        </div>
      </div>
      {addBtn && (
        <div className='todo_showMore'>
          <Link href={`/task/${attribute}?value=${value}`}>
            <p>ver mas</p>
          </Link>
        </div>
      )}
    </div>
  )
}
