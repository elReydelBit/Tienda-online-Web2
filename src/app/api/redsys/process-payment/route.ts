//src\app\api\redsys\process-payment\route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { REDSYS_CONFIG } from '@/lib/redsys-config';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { merchantParameters } = body;

    if (!merchantParameters) {
      return NextResponse.json({ message: 'Missing merchantParameters' }, { status: 400 });
    }

    // Decodifica los parámetros de merchant
    const decodedParams = JSON.parse(Buffer.from(merchantParameters, 'base64').toString('utf8'));

    const userId = Number(decodedParams.USER_ID);
    if (!userId) {
      throw new Error('userId is invalid or missing');
    }

    // Simula el proceso de pago
    const redsysResponse = await simulateRedsysPayment(decodedParams);
    console.log(redsysResponse.status);
    if (redsysResponse.status === 'success') {
      // Primero elimina los items relacionados del carrito
      await prisma.cartItem.deleteMany({
        where: {
          cart: {
            userId 
          }
        }
      });

      // Luego, elimina el propio carrito
      await prisma.cart.deleteMany({
        where: { userId },
      });
    }


    const redirectUrl = redsysResponse.status === 'success'
      ? decodedParams.DS_MERCHANT_URLOK 
      : decodedParams.DS_MERCHANT_URLKO;

    if (!redirectUrl) {
      throw new Error('Missing redirect URL');
    }

    const urlWithParams = new URL(redirectUrl);
    urlWithParams.searchParams.append('orderId', decodedParams.DS_MERCHANT_ORDER);
    urlWithParams.searchParams.append('amount', decodedParams.DS_MERCHANT_AMOUNT);
    urlWithParams.searchParams.append('status', redsysResponse.status);

    return NextResponse.json({ 
      redirect: urlWithParams.toString(),
      ...redsysResponse 
    });

  } catch (error) {
    console.error('Error processing payment:', error);
    const koUrl = new URL(REDSYS_CONFIG.urlKO);
    koUrl.searchParams.append('error', 'internal_server_error');
    return NextResponse.json({ 
      redirect: koUrl.toString(),
      status: 'error',
      message: 'Error processing payment'
    }, { status: 500 });
  }
}

async function simulateRedsysPayment(params) {
  return new Promise((resolve) => {
    setTimeout(() => {
      //const isSuccess = params.DS_MERCHANT_AMOUNT.endsWith('00');
      const isSuccess = 'success';
      resolve({
        status: isSuccess ? 'success' : 'failure',
        message: isSuccess ? 'Payment processed successfully' : 'Payment failed',
        orderID: params.DS_MERCHANT_ORDER,
        amount: params.DS_MERCHANT_AMOUNT
      });
    }, 1000);
  });
}
