//src\app\middleware\midddleware.ts
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export const authMiddleware = async (request: Request) => {
    const token = request.headers.get('authorization')?.split(' ')[1];

    if (!token) {
        return NextResponse.json({ message: 'No se proporciona el token' }, { status: 401 });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || '');
        // Puedes guardar el usuario en el contexto aquí si es necesario
    } catch (err) {
        return NextResponse.json({ message: 'Token inválido' }, { status: 403 });
    }

    return null; // Si todo está bien, retorna null para continuar
};
