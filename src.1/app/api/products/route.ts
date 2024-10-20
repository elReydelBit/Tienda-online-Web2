//src\app\api\products\route.tsimport { NextRequest, NextResponse } from 'next/server';
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '@/app/middleware/midddleware'; // Asegúrate de que la ruta sea correcta
import  prisma  from '@/lib/prisma'; // Asegúrate de que esta ruta sea correcta

export async function GET() {
    try {
        const products = await prisma.product.findMany(); // Obtén todos los productos
        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json({ message: 'Error al obtener productos' }, { status: 500 });
    }
}



/*
const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    // Llama directamente al middleware de autenticación
    const authResponse = await authMiddleware(req);
    if (authResponse) {
        return authResponse; // Si el middleware retorna una respuesta, devuélvela directamente
    }

    try {
        const products = await prisma.product.findMany();
        return NextResponse.json(products);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: 'Error fetching products' },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    // Llama directamente al middleware de autenticación
    const authResponse = await authMiddleware(req);
    if (authResponse) {
        return authResponse; // Si el middleware retorna una respuesta, devuélvela directamente
    }

    try {
        const { name, description, price } = await req.json();
        const product = await prisma.product.create({
            data: { name, description, price },
        });
        return NextResponse.json(product);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: 'Error creating product' },
            { status: 500 }
        );
    }
}
*/
