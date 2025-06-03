import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET() {
  try {
    const isConnected = mongoose.connection.readyState === 1;
    
    return NextResponse.json({
      status: 'success',
      connected: isConnected,
      connectionState: mongoose.connection.readyState,
      connectionStateText: ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState],
      database: mongoose.connection.name,
      host: mongoose.connection.host,
    });
  } catch (error) {
    console.error('MongoDB connection check error:', error);
    return NextResponse.json({
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
      connected: false,
    }, { status: 500 });
  }
} 