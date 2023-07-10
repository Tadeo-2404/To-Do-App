import prisma from '../../../../prisma/client/index';
import { NextResponse } from 'next/server';

//objeto todo con todos sus atributos
type Todo = {
  title: string,
  description?: string,
  category?: string,
  createdAt?: string,
  dueDate?: string,
  priority?: boolean,
  completed?: boolean,
}

//metodo GET que obtiene los Task que se filtran en base a sus atributos
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url); //obtener parametros url
    const attribute = searchParams.get('attribute'); //obtener el atributo de la URL a buscar
    const value = searchParams.get('value'); //obtener el valor del atributo
    const limit = searchParams.get('limit'); //obtener el valor del atributo
    let isTrue = (value == "true") ? true : false; //variable auxiliar para consultar clausula
    let whereClause; //inicializacion de clausula
    let todos;

    //clausula de consulta a la base de datos
    if(attribute && value) {
       whereClause = { [attribute as string]: value };
    }

    //obtener los Task completados o marcados como prioridad
    if(attribute == "completed" || attribute == "priority") {
      whereClause = { [attribute as string]: isTrue };
    }

    //query de consulta a la base de datos
    if (limit) {
      const parsedLimit = parseInt(limit, 10);
      if (!isNaN(parsedLimit)) {
        todos = await prisma.todo.findMany({
          where: whereClause,
          take: parsedLimit
        });
      } else {
        todos = await prisma.todo.findMany({
          where: whereClause
        });
      }
    } else {
      todos = await prisma.todo.findMany({
        where: whereClause
      });
    }

    return NextResponse.json(todos);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Internal server error' });
  }
}

//metodo POST que crea un nuevo task
export async function POST(request: Request) {
  try {
    const data:Todo = await request.json();
    const {title, description, category, createdAt, dueDate, priority, completed} = data;
    const todo = await prisma.todo.create({
      data: {
        title,
        description,
        category,
        createdAt,
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
  const { title, description, category, createdAt, dueDate, priority, completed } = data;

  try {
    if (id) {
      const updatedTodo = await prisma.todo.update({
        where: { id: parseInt(id) },
        data: {
          title,
          description,
          category,
          createdAt,
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
