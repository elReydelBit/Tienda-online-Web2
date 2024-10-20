// src/app/api/checkout/route.ts
import { NextResponse } from 'next/server';
import crypto from 'crypto';

const MERCHANT_KEY = '999008881'; // Debes obtener esta clave de Redsys

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const Ds_MerchantParameters = formData.get('Ds_MerchantParameters') as string;
        const Ds_Signature = formData.get('Ds_Signature') as string;

        // Decodificar los parámetros del comerciante
        const decodedParams = JSON.parse(Buffer.from(Ds_MerchantParameters, 'base64').toString('utf8'));

        // Verificar la firma
        const merchantKey = Buffer.from(MERCHANT_KEY, 'base64');
        const orderId = decodedParams.Ds_Order;
        const key = crypto.createCipheriv('des-ede3-cbc', merchantKey, Buffer.alloc(8, 0));
        key.setAutoPadding(false);
        let signatureKey = key.update(orderId, 'utf8', 'base64');
        signatureKey += key.final('base64');

        const hmac = crypto.createHmac('sha256', Buffer.from(signatureKey, 'base64'));
        hmac.update(Ds_MerchantParameters);
        const calculatedSignature = hmac.digest('base64');

        if (calculatedSignature !== Ds_Signature) {
            throw new Error('Firma inválida');
        }

        // Procesar el resultado del pago
        const responseCode = decodedParams.Ds_Response;
        if (responseCode >= '0000' && responseCode <= '0099') {
            // Pago exitoso
            console.log('Pago exitoso');
            // Aquí puedes actualizar tu base de datos, enviar confirmaciones, etc.
            return NextResponse.json({ message: 'Pago procesado correctamente' });
        } else {
            // Pago fallido
            console.error('Pago fallido', decodedParams);
            return NextResponse.json({ error: 'Error en el pago' }, { status: 400 });
        }
    } catch (error) {
        console.error('Error al procesar la respuesta de Redsys:', error);
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}
