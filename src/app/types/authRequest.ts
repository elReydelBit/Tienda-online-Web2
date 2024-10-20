//src\app\types\authRequest.ts
import { NextRequest } from 'next/server';

interface UserPayload {
    id: number;
    email: string;
    // Puedes añadir más propiedades según lo que incluyas en el token JWT
}

export interface AuthenticatedRequest extends NextRequest {
    user?: UserPayload; // Definimos un tipo específico para 'user'
}
