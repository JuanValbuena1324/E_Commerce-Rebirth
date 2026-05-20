import { NextRequest, NextResponse } from 'next/server';
import { PRODUCTS } from '@/lib/products';

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const product = PRODUCTS.find((p) => p.id === Number(params.id));
  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }
  // Related: same category, exclude self
  const related = PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category
  ).slice(0, 4);

  return NextResponse.json({ product, related });
}
