import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const formResponse = await prisma.formResponse.create({
      data: {
        type: data.type || 'contact',
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        subject: data.subject || '',
        message: data.message,
        data: JSON.stringify(data),
        status: 'NEW',
        priority: 'NORMAL'
      }
    });

    return NextResponse.json({ success: true, id: formResponse.id });
  } catch (error) {
    console.error('Form submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    );
  }
}
