import { NextResponse } from 'next/server';
import { HTTP_STATUS } from '../constants/api';

export async function handleApiError(error: unknown) {
  console.error('API Error:', error);
  
  if (error instanceof Error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    );
  }

  return NextResponse.json(
    { success: false, error: 'Internal Server Error' },
    { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
  );
}

export function createSuccessResponse<T>(data: T, status: number = HTTP_STATUS.OK) {
  return NextResponse.json(
    { success: true, data },
    { status }
  );
}

export function createErrorResponse(message: string, status: number = HTTP_STATUS.BAD_REQUEST) {
  return NextResponse.json(
    { success: false, error: message },
    { status }
  );
} 