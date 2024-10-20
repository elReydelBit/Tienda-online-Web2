'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function ErrorPage() {
  const router = useRouter();
  const [errorDetails, setErrorDetails] = useState<string | null>(null);

  useEffect(() => {
    // Intenta obtener detalles del error de localStorage
    const storedError = localStorage.getItem('paymentError');
    if (storedError) {
      setErrorDetails(storedError);
      localStorage.removeItem('paymentError'); // Limpia el error almacenado
    }
  }, []);

  return (
    <Layout>
      <div className="container mx-auto py-20">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden md:max-w-2xl">
          <div className="md:flex">
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-red-500 font-semibold mb-1">Error en el pago</div>
              <h1 className="block mt-1 text-lg leading-tight font-medium text-black">Lo sentimos, ha ocurrido un error</h1>
              <p className="mt-2 text-gray-500">
                No se pudo procesar tu pago. Por favor, intenta nuevamente o contacta con nuestro servicio de atención al cliente.
              </p>
              {errorDetails && (
                <div className="mt-4 p-4 bg-red-50 rounded-md">
                  <p className="text-sm text-red-700">Detalles del error: {errorDetails}</p>
                </div>
              )}
              <div className="mt-6 flex flex-col space-y-4">
                <Link href="/checkout" className="px-4 py-2 bg-blue-500 text-white text-center font-semibold rounded-md hover:bg-blue-600 transition duration-300">
                  Intentar pago nuevamente
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
