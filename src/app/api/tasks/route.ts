import prisma from '../../../../prisma/client/index';
import { NextResponse } from 'next/server'

export async function GET(req: Request, res: Response) {
  const todos = await prisma.todo.findMany();
  return NextResponse.json(todos);
}

export async function POST(request: Request) {}
 
export async function PUT(request: Request) {}

export async function DELETE(request: Request) {}

