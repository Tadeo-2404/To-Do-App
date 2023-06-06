"use client"
import React, { useEffect, useState } from 'react';
import Todos from "../components/Todos";
import '../styles/home.css'

interface categories {
  category: string
}

export default function Home() {
  const [types, setTypes] = useState<categories[]>([]);

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
      <h1>Welcome</h1>
      <div className="container_todos">
        <Todos attribute={"completed"} value={"false"} title={"TODO"} />
        <Todos attribute={"priority"} value={"true"} title={"TOP PRIORITY"} />
        {types.map((item) => (
          <Todos attribute={"category"} value={item.category} title={item.category.toUpperCase()} />
        ))}
      </div>
    </div>
  );
}
