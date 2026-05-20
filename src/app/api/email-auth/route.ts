import { NextRequest, NextResponse } from 'next/server';
import { VALID_DISCOUNT_CODES } from '@/types';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { action } = body;

  if (action === 'login') {
    const { email, password } = body;
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }
    // TODO: compare against DB hash
    return NextResponse.json({ success: true, message: 'Welcome back to Rebirth!' });
  }

  if (action === 'signup') {
    const { firstName, lastName, email, password } = body;
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json({ error: 'All fields required' }, { status: 400 });
    }
    // TODO: create user in DB, hash password
    return NextResponse.json({
      success: true,
      message: `Account created! Welcome to Rebirth, ${firstName}!`,
    });
  }

  if (action === 'validateDiscount') {
    const { code } = body;
    const rate = VALID_DISCOUNT_CODES[code?.toUpperCase()];
    if (!rate) {
      return NextResponse.json({ valid: false, error: 'Invalid discount code' }, { status: 400 });
    }
    return NextResponse.json({ valid: true, discountRate: rate, discountPercent: rate * 100 });
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
}
