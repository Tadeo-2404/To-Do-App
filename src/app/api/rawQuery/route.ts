import prisma from '../../../../prisma/client/index';
import { NextResponse } from 'next/server';

//obtener todas las categorias
export async function GET(request: Request) {
    try {
      const todos = await prisma.$queryRaw`SELECT DISTINCT "category" FROM "Todo"`
      return NextResponse.json(todos);
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: 'Internal server error' });
    }
  }