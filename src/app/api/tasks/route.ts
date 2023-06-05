import prisma from '../../../../prisma/client/index';
import { NextResponse } from 'next/server';

type Todo = {
  title: string,
  description?: string,
  category?: string,
  createdAt?: string,
  dueHour?: string,
  dueDate?: string,
  priority?: boolean,
  completed?: boolean,
}

export async function GET(request: Request) {
  try {
    const todos = await prisma.todo.findMany();
    return NextResponse.json(todos);
  } catch (error) {
    console.log(error)
  }
}

export async function POST(request: Request) {
  try {
    const data:Todo = await request.json();
    const {title, description, category, createdAt, dueHour, dueDate, priority, completed} = data;
    const todo = await prisma.todo.create({
      data: {
        title,
        description,
        category,
        createdAt,
        dueHour,
        dueDate,
        priority,
        completed,
      },
    });  
    return NextResponse.json(todo);
  } catch (error) {
    console.log(error)
  }
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const data: Todo = await request.json();
  const { title, description, category, createdAt, dueHour, dueDate, priority, completed } = data;

  try {
    if (id) {
      const updatedTodo = await prisma.todo.update({
        where: { id: parseInt(id) },
        data: {
          title,
          description,
          category,
          createdAt,
          dueHour,
          dueDate,
          priority,
          completed,
        },
      });
      return NextResponse.json(updatedTodo);
    } else {
      console.log('Param "id" is not present at URL');
    }
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  try {
    await prisma.todo.delete({
      where: {id: parseInt(id as string) }
    });
    return NextResponse.json({ msg: `Todo ID ${id} deleted successfully` });
  } catch (error) {
    console.log(error);
  }
}
