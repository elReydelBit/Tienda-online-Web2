// src/app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    const { identifier, password } = await request.json();

    // Validar si los campos están completos
    if (!identifier || !password) {
      return NextResponse.json(
        { error: 'Ambos campos son requeridos.' }, 
        { status: 400 }
      );
    }

    // Buscar al usuario por nombre o email
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: identifier },
          { name: identifier }
        ],
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Usuario no encontrado.' }, 
        { status: 404 }
      );
    }

    // Comparar la contraseña
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json(
        { error: 'Contraseña incorrecta.' }, 
        { status: 401 }
      );
    }

    // Generar token JWT
    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        name: user.name 
      },
      process.env.JWT_SECRET || 'defaultsecret',
      { expiresIn: '1h' }
    );

    // Respuesta de éxito
    return NextResponse.json({
      success: true,
      message: 'Inicio de sesión exitoso',
      token,
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email 
      },
    });

  } catch (error) {
    console.error('Error en el login:', error);
    return NextResponse.json(
      { error: 'Error en el inicio de sesión. Inténtalo de nuevo más tarde.' }, 
      { status: 500 }
    );
  }
}