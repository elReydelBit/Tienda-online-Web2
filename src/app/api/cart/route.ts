import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Obtener los ítems del carrito
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');


  if (!userId) {
    return NextResponse.json({ message: 'Falta el userId en los parámetros' }, { status: 400 });
  }

  try {
 
    // Buscamos el carrito del usuario con los items relacionados
    const cart = await prisma.cart.findFirst({
      where: { userId: Number(userId) },
      include: { items: true },
    });

    if (!cart) {
      return NextResponse.json({ message: 'Carrito no encontrado' }, { status: 404 });
    }

    return NextResponse.json(cart);
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
  }
}

// Añadir un ítem al carrito
export async function POST(req: Request) {
  const { userId, productId, quantity } = await req.json();

  if (!userId || !productId || !quantity) {
    return NextResponse.json({ message: 'Faltan parámetros' }, { status: 400 });
  }

  try {
    // Primero, intenta encontrar el carrito del usuario
    let cart = await prisma.cart.findFirst({
      where: { userId: Number(userId) },
    });

    // Si el carrito no existe, créalo
    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId: Number(userId),
        },
      });
    }

    // Busca si ya existe un item en el carrito para este producto
    const existingCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId: Number(productId)
      }
    });

    if (existingCartItem) {
      // Si existe, actualiza la cantidad
      await prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + quantity }
      });
    } else {
      // Si no existe, crea un nuevo item
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: Number(productId),
          quantity
        }
      });
    }

    // Devuelve el carrito actualizado
    const updatedCart = await prisma.cart.findFirst({
      where: { id: cart.id },
      include: { items: true },
    });


    return NextResponse.json(updatedCart);
  } catch (error) {
    console.error('Error al añadir al carrito:', error);
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
  }
}
