// src/app/api/auth/register/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json();

    // Validar que los campos estén completos
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: 'Todos los campos son obligatorios.' }, 
        { status: 400 }
      );
    }

    // Verificar si el usuario ya existe (email o nombre)
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { name: username }
        ]
      }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'El usuario o email ya existe.' }, 
        { status: 409 }
      );
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear nuevo usuario
    const user = await prisma.user.create({
      data: {
        name: username,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Usuario registrado exitosamente.' 
    });
    
  } catch (error) {
    console.error('Error en el registro:', error);
    return NextResponse.json({ 
      error: 'Error en el registro. Inténtalo de nuevo más tarde.' 
    }, { status: 500 });
  }
}