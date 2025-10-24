import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - Retrieve all solutions
export async function GET() {
  try {
    const solutions = await prisma.solution.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(solutions);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch solutions' }, { status: 500 });
  }
}

// POST - Create new solution
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const solution = await prisma.solution.create({
      data: {
        stageId: body.stageId,
        code: body.code,
        isCorrect: body.isCorrect,
        timeSpent: body.timeSpent,
        userId: body.userId || 'anonymous'
      }
    });
    return NextResponse.json(solution, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create solution' }, { status: 500 });
  }
}

// PUT - Update solution
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const solution = await prisma.solution.update({
      where: { id: body.id },
      data: {
        code: body.code,
        isCorrect: body.isCorrect,
        timeSpent: body.timeSpent
      }
    });
    return NextResponse.json(solution);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update solution' }, { status: 500 });
  }
}

// DELETE - Delete solution
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }
    
    await prisma.solution.delete({
      where: { id }
    });
    return NextResponse.json({ message: 'Solution deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete solution' }, { status: 500 });
  }
}