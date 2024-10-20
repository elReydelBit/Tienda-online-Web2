// src/app/api/products/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Asegúrate de que esta ruta sea correcta

// Obtener todos los productos
export async function GET() {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
}