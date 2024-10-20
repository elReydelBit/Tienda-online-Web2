// app/api/redsys/signature/route.ts
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { REDSYS_CONFIG } from '@/lib/redsys-config'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { merchantParameters } = body

    if (!merchantParameters) {
      return NextResponse.json({ message: 'Missing merchantParameters' }, { status: 400 })
    }

    const key = Buffer.from(REDSYS_CONFIG.merchantKey, 'base64')
    
    // Decodificar los parámetros del comerciante
    const decodedParams = JSON.parse(Buffer.from(merchantParameters, 'base64').toString('utf8'))
    
    // Obtener el número de pedido
    const orderId = decodedParams.DS_MERCHANT_ORDER
    
    // Crear la clave de la operación
    const orderKey = crypto.createHmac('sha256', key).update(orderId).digest()
    
    // Calcular la firma
    const signature = crypto.createHmac('sha256', orderKey)
      .update(merchantParameters)
      .digest('base64')

    return NextResponse.json({ signature })
  } catch (error) {
    console.error('Error generating signature:', error)
    return NextResponse.json(
      { message: 'Error generating signature', error: (error as Error).message },
      { status: 500 }
    )
  }
}

// Opcional: manejar explícitamente otros métodos HTTP
export async function GET() {
  return NextResponse.json({ message: 'Only POST requests are allowed' }, { status: 405 })
}

export async function PUT() {
  return NextResponse.json({ message: 'Only POST requests are allowed' }, { status: 405 })
}

export async function DELETE() {
  return NextResponse.json({ message: 'Only POST requests are allowed' }, { status: 405 })
}
