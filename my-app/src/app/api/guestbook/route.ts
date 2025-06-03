import { NextResponse } from 'next/server';
import { GuestbookFormData } from '../../../types/guestbook';
import connectDB from '../../../lib/mongodb';
import GuestbookMessage from '../../../models/GuestbookMessage';

export async function GET() {
  try {
    await connectDB();
    const messages = await GuestbookMessage.find().sort({ createdAt: -1 });
    return NextResponse.json(messages);
  } catch (error) {
    console.error('GET /api/guestbook error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data: GuestbookFormData = await request.json();
    
    if (!data.name || !data.message) {
      return NextResponse.json(
        { error: 'Name and message are required' },
        { status: 400 }
      );
    }

    await connectDB();
    const newMessage = await GuestbookMessage.create({
      name: data.name.trim(),
      message: data.message.trim(),
      isAdmin: false,
    });

    return NextResponse.json(newMessage);
  } catch (error) {
    console.error('POST /api/guestbook error:', error);
    return NextResponse.json(
      { error: 'Failed to create message' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const adminKey = searchParams.get('adminKey');

    if (!id) {
      return NextResponse.json(
        { error: 'Message ID is required' },
        { status: 400 }
      );
    }

    if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    const deletedMessage = await GuestbookMessage.findByIdAndDelete(id);

    if (!deletedMessage) {
      return NextResponse.json(
        { error: 'Message not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    console.error('DELETE /api/guestbook error:', error);
    return NextResponse.json(
      { error: 'Failed to delete message' },
      { status: 500 }
    );
  }
} 