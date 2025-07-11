import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    
    return NextResponse.json({ message: 'Logout successful' }, { status: 200 });
  } catch (error) {
    console.error('Error during logout API:', error);
    return NextResponse.json({ message: 'Logout failed' }, { status: 500 });
  }
}
