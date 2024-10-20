'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function SuccessPage() {
  const router = useRouter();
  const [successDetails, setSuccessDetails] = useState<string | null>(null);

  useEffect(() => {
    // Intenta obtener detalles del éxito del localStorage si es necesario
    const storedSuccess = localStorage.getItem('paymentSuccess');
    if (storedSuccess) {
      setSuccessDetails(storedSuccess);
      localStorage.removeItem('paymentSuccess'); // Limpia el éxito almacenado
    }
  }, []);

  return (
    <Layout>
      <div className="container mx-auto py-20">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden md:max-w-2xl">
          <div className="md:flex">
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-green-500 font-semibold mb-1">Pago exitoso</div>
              <h1 className="block mt-1 text-lg leading-tight font-medium text-black">¡Gracias por tu compra!</h1>
              <p className="mt-2 text-gray-500">
                Tu pago se ha procesado correctamente. Te hemos enviado un correo electrónico con los detalles de tu pedido.
              </p>
              {successDetails && (
                <div className="mt-4 p-4 bg-green-50 rounded-md">
                  <p className="text-sm text-green-700">Detalles del pedido: {successDetails}</p>
                </div>
              )}
              <div className="mt-6 flex flex-col space-y-4">
                <Link href="/orders" className="px-4 py-2 bg-blue-500 text-white text-center font-semibold rounded-md hover:bg-blue-600 transition duration-300">
                  Ver mis pedidos
                </Link>
                <Link href="/" className="px-4 py-2 bg-gray-200 text-gray-700 text-center font-semibold rounded-md hover:bg-gray-300 transition duration-300">
                  Volver a la página principal
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
