import { NextRequest } from 'next/server';
import { GuestbookEntry } from '@/types/guestbook';
import { HTTP_STATUS } from '@/constants/api';
import { createSuccessResponse, createErrorResponse, handleApiError } from '@/utils/api';
import connectDB from '@/lib/mongodb';
import Guestbook from '@/models/Guestbook';

export async function GET(): Promise<Response> {
  try {
    await connectDB();
    const entries = await Guestbook.find().sort({ createdAt: -1 });
    
    return createSuccessResponse<GuestbookEntry[]>(entries);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const body = await request.json();
    const { content, author, isAdmin = false } = body;

    if (!content || !author) {
      return createErrorResponse('Content and author are required');
    }

    await connectDB();
    const newEntry = await Guestbook.create({
      content,
      author,
      isAdmin,
    });

    return createSuccessResponse<GuestbookEntry>(newEntry, HTTP_STATUS.CREATED);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: NextRequest): Promise<Response> {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return createErrorResponse('Entry ID is required');
    }

    await connectDB();
    const deletedEntry = await Guestbook.findByIdAndDelete(id);

    if (!deletedEntry) {
      return createErrorResponse('Entry not found', HTTP_STATUS.NOT_FOUND);
    }

    return createSuccessResponse({ message: 'Entry deleted successfully' });
  } catch (error) {
    return handleApiError(error);
  }
} 