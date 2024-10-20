'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Layout from '@/app/components/Layout';
import useLocalStorage from '@/app/hooks/useLocalStorage'; 

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface CartItem {
  productId: number;
  quantity: number;
}

interface User {
  id: string;
}

export default function Tienda() {
  const [isClient, setIsClient] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useLocalStorage<CartItem[]>('cart', []);
  const [storedUser] = useLocalStorage<string>('user', '');
  const [storedToken] = useLocalStorage<string>('token', '');

  useEffect(() => {
    setIsClient(true);
    const fetchProducts = async () => {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const addToCart = async (productId: number, quantity: number) => {
    const updatedCart = [...cart];
    const existingItemIndex = updatedCart.findIndex(item => item.productId === productId);

    if (existingItemIndex > -1) {
      updatedCart[existingItemIndex].quantity += quantity;
    } else {
      updatedCart.push({ productId, quantity });
    }

    setCart(updatedCart);

    // Llamada a la API para guardar en la base de datos
    if (storedToken && storedUser) {
      const user = JSON.parse(storedUser) as User;
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedToken}`,
        },
        body: JSON.stringify({
          userId: user.id,
          productId,
          quantity
        })
      });

      if (!response.ok) {
        console.error('Error al añadir al carrito:', response.statusText);
      }
    }
  };

  const handleAddToCart = (productId: number) => {
    if (!storedToken || !storedUser) {
      alert('Debes iniciar sesión para añadir productos a la cesta.');
      return;
    }

    const quantity = parseInt((document.getElementById(`quantity-${productId}`) as HTMLInputElement).value);
    if (isNaN(quantity) || quantity < 1) {
      alert('Por favor, introduce una cantidad válida.');
      return;
    }
    
    addToCart(productId, quantity);
  };

  if (!isClient) {
    return <Layout><div>Cargando...</div></Layout>;
  }

  return (
    <Layout>
      <h1 className="text-center text-2xl font-bold mb-6">Lista de Productos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 shadow-md flex flex-col">
              <h2 className="font-semibold text-lg">{product.name}</h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="mt-2 text-xl font-bold">${product.price.toFixed(2)}</p>
              <div className="flex items-center mt-2 w-full">
                <input
                  type="number"
                  min="1"
                  defaultValue="1"
                  id={`quantity-${product.id}`}
                  className="border rounded p-1 w-1/2 mr-2"
                />
                <button
                  onClick={() => handleAddToCart(product.id)}
                  className="bg-gradient-to-r from-purple-400 to-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300 w-1/2"
                >
                  Añadir a la cesta
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No hay productos disponibles.</p>
        )}
      </div>
    </Layout>
  );
}
