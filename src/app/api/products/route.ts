import { NextRequest, NextResponse } from 'next/server';
import { PRODUCTS } from '@/lib/products';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const category  = searchParams.get('category');
  const size      = searchParams.get('size');
  const minPrice  = searchParams.get('minPrice');
  const maxPrice  = searchParams.get('maxPrice');
  const featured  = searchParams.get('featured');
  const limit     = Number(searchParams.get('limit') ?? 50);

  let products = [...PRODUCTS];

  if (category)  products = products.filter((p) => p.category === category);
  if (size)      products = products.filter((p) => p.sizes.includes(size as any));
  if (minPrice)  products = products.filter((p) => p.price >= Number(minPrice));
  if (maxPrice)  products = products.filter((p) => p.price <= Number(maxPrice));
  if (featured === 'true') products = products.slice(0, 3); // most wanted

  return NextResponse.json({ products: products.slice(0, limit), total: products.length });
}
