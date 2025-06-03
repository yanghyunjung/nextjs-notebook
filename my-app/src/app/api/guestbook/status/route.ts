import { GuestbookStatus } from '@/types/guestbook';
import { createSuccessResponse, handleApiError } from '@/utils/api';
import connectDB from '@/lib/mongodb';
import Guestbook from '@/models/Guestbook';

export async function GET(): Promise<Response> {
  try {
    await connectDB();
    const total = await Guestbook.countDocuments();
    const lastEntry = await Guestbook.findOne().sort({ createdAt: -1 });

    const status: GuestbookStatus = {
      total,
      lastUpdated: lastEntry?.createdAt?.toISOString() || new Date().toISOString(),
    };

    return createSuccessResponse<GuestbookStatus>(status);
  } catch (error) {
    return handleApiError(error);
  }
} 