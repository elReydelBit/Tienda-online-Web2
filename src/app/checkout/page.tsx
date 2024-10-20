//src\app\checkout\page.tsx
'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../components/Layout';
import { REDSYS_CONFIG } from '@/lib/redsys-config';
import useLocalStorage from '../hooks/useLocalStorage'; // Importa el hook correcto
import {total_Pasado} from '@/app/cart/page'; //para manejar el valor de lo usado allí

const generateOrderId = () => {
  return `${Date.now()}${Math.random().toString(36).substr(2, 5)}`;
};

const createMerchantParameters = (orderId, amount, userId) => {
  const params = {
    DS_MERCHANT_AMOUNT: Math.round(amount * 100).toString(),
    DS_MERCHANT_ORDER: orderId,
    DS_MERCHANT_MERCHANTCODE: REDSYS_CONFIG.merchantCode,
    DS_MERCHANT_CURRENCY: REDSYS_CONFIG.currency,
    DS_MERCHANT_TRANSACTIONTYPE: REDSYS_CONFIG.transactionType,
    DS_MERCHANT_TERMINAL: REDSYS_CONFIG.terminal,
    DS_MERCHANT_MERCHANTURL: `${window.location.origin}/api/redsys/notify`,
    DS_MERCHANT_URLOK: `${window.location.origin}/ok`,
    DS_MERCHANT_URLKO: `${window.location.origin}/ko`,
    DS_MERCHANT_TITULAR: REDSYS_CONFIG.titular,
    DS_MERCHANT_CONSUMERLANGUAGE: "001",
    USER_ID: userId // Asegúrate de pasar el userId aquí
  };
  return btoa(JSON.stringify(params));
};

export default function CheckoutPage() {
  const router = useRouter();
  const [amount, setAmount] = useState(0);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [orderId, setOrderId] = useState('');

  // Recuperar user desde localStorage
  const [storedUser] = useLocalStorage<string>('user', '');
  const user = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    const newOrderId = generateOrderId();
    setOrderId(newOrderId);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    if (!user || !user.id) {
      setError('No se pudo determinar el ID de usuario.');
      setIsSubmitting(false);
      return;
    }

    try {
      const merchantParameters = createMerchantParameters(orderId, amount, user.id);
      const params = JSON.parse(atob(merchantParameters));
      params.DS_MERCHANT_PAN = cardNumber.replace(/\s/g, '');
      params.DS_MERCHANT_EXPIRYDATE = expiryDate.replace(/\D/g, '');
      params.DS_MERCHANT_CVV2 = cvv;
      
      const updatedMerchantParameters = btoa(JSON.stringify(params));
      
      const response = await fetch('/api/redsys/process-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ merchantParameters: updatedMerchantParameters }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al procesar el pago: ${response.statusText}. Details: ${errorText}`);
      }
      
      const data = await response.json();
      
      if (data.redirect) {
        router.push(data.redirect);
      } else {
        throw new Error('No se recibió una URL de redirección válida');
      }
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      setError(error instanceof Error ? error.message : 'Error desconocido');
    } finally {
      setIsSubmitting(false);
    }

  };

  return (
    <Layout>
      <div className="container mx-auto py-20">
        <h1 className="text-2xl font-bold mb-4">Finalizar Compra</h1>

        {/* Resumen del pedido */}
        <div className="mb-6 p-6 bg-white rounded-lg shadow">
          <p className="font-bold text-lg mb-2">Resumen del Pedido</p>
          <div className="space-y-2">
            <p className="text-gray-600">Número de pedido: <span className="font-medium">{orderId}</span></p>
            <p className="text-xl font-bold">Total a pagar: {total_Pasado.toFixed(2)}€</p>
          </div>
        </div>

        {/* Formulario de pago */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Formulario de Pago</h2>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label>
                  Amount (EUR):
                  <input
                    type="number"
                    value={total_Pasado.toFixed(2)}
                    onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                    step="0.01"
                    min="0"
                    required
                    className="mt-1 block w-full"
                  />
                </label>
              </div>
              <div>
                <label>
                  Card Number:
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    required
                    className="mt-1 block w-full"
                  />
                </label>
              </div>
              <div>
                <label>
                  Expiry Date (MM/YY):
                  <input
                    type="text"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    placeholder="MM/YY"
                    required
                    className="mt-1 block w-full"
                  />
                </label>
              </div>
              <div>
                <label>
                  CVV:
                  <input
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="123"
                    required
                    className="mt-1 block w-full"
                  />
                </label>
              </div>
              <button type="submit" disabled={isSubmitting} className="button mt-4">
                {isSubmitting ? 'Procesando...' : 'Pagar'}
              </button>
            </form>
            {error && <p className="p-4 text-red-600">{error}</p>}
          </div>
        </div>

        {/* Información adicional */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-600">
            Serás redirigido a la pasarela de pago segura de Redsys para completar tu compra.
          </p>
        </div>
      </div>
    </Layout>
  );
}
