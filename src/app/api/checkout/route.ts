// src/app/api/checkout/route.ts
import { NextResponse } from 'next/server';
import crypto from 'crypto';

const MERCHANT_KEY = '999008881'; // Debes obtener esta clave de Redsys

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const Ds_MerchantParameters = formData.get('Ds_MerchantParameters') as string;
        const Ds_Signature = formData.get('Ds_Signature') as string;

        if (!Ds_MerchantParameters || !Ds_Signature) {
            console.error('Faltan parámetros en la solicitud');
            return NextResponse.json({ error: 'Faltan parámetros en la solicitud' }, { status: 400 });
        }

        // Decodificar los parámetros del comerciante
        let decodedParams;
        try {
            decodedParams = JSON.parse(Buffer.from(Ds_MerchantParameters, 'base64').toString('utf8'));
        } catch (error) {
            console.error('Error al decodificar los parámetros:', error);
            return NextResponse.json({ error: 'Error al decodificar los parámetros' }, { status: 400 });
        }

        console.log('Parámetros decodificados:', decodedParams);

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

        console.log('Firma calculada:', calculatedSignature);
        console.log('Firma recibida:', Ds_Signature);

        if (calculatedSignature !== Ds_Signature) {
            console.error('Firma inválida');
            return NextResponse.json({ error: 'Firma inválida' }, { status: 400 });
        }

        // Procesar el resultado del pago
        const responseCode = decodedParams.Ds_Response;
        console.log('Código de respuesta:', responseCode);

        if (responseCode >= '0000' && responseCode <= '0099') {
            // Pago exitoso
            console.log('Pago exitoso');
            // Aquí puedes actualizar tu base de datos, enviar confirmaciones, etc.
            return NextResponse.json({ message: 'Pago procesado correctamente' });
        } else {
            // Pago fallido
            console.error('Pago fallido', decodedParams);
            return NextResponse.json({ error: 'Error en el pago', details: decodedParams }, { status: 400 });
        }
    } catch (error) {
        console.error('Error al procesar la respuesta de Redsys:', error);
        return NextResponse.json({ error: 'Error interno del servidor', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
    }
}
