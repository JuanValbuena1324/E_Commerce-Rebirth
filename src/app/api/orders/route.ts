import { NextRequest, NextResponse } from 'next/server';
import { VALID_DISCOUNT_CODES } from '@/types';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { items, contact, shipping, payment, discountCode } = body;

  // Basic validation
  if (!items?.length) {
    return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
  }
  if (!contact?.email || !contact?.firstName || !contact?.lastName) {
    return NextResponse.json({ error: 'Missing required contact fields' }, { status: 400 });
  }

  // Calculate totals
  const subtotal = items.reduce(
    (sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity,
    0
  );

  const shippingCosts: Record<string, number> = {
    standard: 9500,
    express: 15900,
    same_day: 24900,
  };
  const shippingCost = shippingCosts[shipping?.method ?? 'standard'] ?? 9500;

  const discountRate = discountCode ? (VALID_DISCOUNT_CODES[discountCode.toUpperCase()] ?? 0) : 0;
  const discount     = subtotal * discountRate;
  const total        = subtotal + shippingCost - discount;

  // Generate order number (in production: persist to DB)
  const orderNumber = 'RBTH-' + Math.random().toString(36).slice(2, 10).toUpperCase();

  return NextResponse.json({
    success: true,
    orderNumber,
    summary: { subtotal, shippingCost, discount, total },
  });
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const userId = searchParams.get('userId');

  // Future: return user's order history from DB
  return NextResponse.json({
    orders: [],
    message: userId ? `Orders for user ${userId}` : 'No userId provided',
  });
}
