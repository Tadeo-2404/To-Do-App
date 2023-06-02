"use client";
import React, { useEffect, useState } from 'react';

type Todo = {
    id: number;
    title: string;
    description: string,
    completed: boolean,
    priority: boolean,
    date: string
};

export default function Todos() {
    const [data, setData] = useState<Todo[]>([]);

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
      <h1>Todos</h1>
      <div>
      {data.map((item) => (
        <div key={item.id}>
            <h1>{item.title}</h1>
            <p>{item.description}</p>
            <p>{item.date}</p>
            <p>{item.priority.toString()}</p>
            <p>{item.completed.toString()}</p>
        </div>
      ))}
      </div>
    </div>
  )
}
