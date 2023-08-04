"use client";
import React, { useEffect, useState } from 'react';
import { Task } from './Task';
import Link from 'next/link';
import { obtenerTasks } from '../app/lib/task/api_task';
import { useContextValue } from '../context/TaskContext';
import { CustomButton } from './custom/CustomButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
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
  addBtn: boolean,
}

export default function Todos({ attribute, value, title, limit, addBtn }: arguments) {
  const [data, setData] = useState<Item[]>([]);
  const { render } = useContextValue();

  //fetching data
  useEffect(() => {
    const fetchData = async () => {
      const response: any = await obtenerTasks({ attribute, value, limit });
      setData(response.response);
    };

    fetchData();
  }, [render]);

  return (
    <div>
      <div>
        <h1>{title}</h1>
        {data.length > 0 ? (
          <div className='todos_container'>
            {
              data.map((item) => (
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
              ))
            }
          </div>
        ) : (
          <div>
            sin items
          </div>
        )}
      </div>
      {addBtn && (
          <Link href={`/task/${attribute}?value=${value}`}>
            <CustomButton text='Ver mas' variant="contained" size="large" endIcon={<ArrowForwardIcon />}/>
          </Link>
      )}
    </div>
  );
}

