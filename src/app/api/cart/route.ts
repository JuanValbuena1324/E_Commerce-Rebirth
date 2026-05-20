import { NextRequest, NextResponse } from 'next/server';

// NOTE: The client cart is managed fully in Zustand with localStorage persistence.
// These endpoints are provided for server-side cart validation (e.g. stock check).

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { productId, size, quantity } = body;

  if (!productId || !size || !quantity) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  // Future: validate stock against DB, apply server-side pricing, etc.
  return NextResponse.json({
    success: true,
    message: `Cart item validated: product ${productId}, size ${size}, qty ${quantity}`,
  });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const productId = searchParams.get('productId');
  const size      = searchParams.get('size');

  if (!productId || !size) {
    return NextResponse.json({ error: 'Missing productId or size' }, { status: 400 });
  }

  return NextResponse.json({ success: true, removed: { productId, size } });
}
