'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout'; // Ajusta la ruta si es necesario
import useLocalStorage from '../hooks/useLocalStorage'; // Asegúrate de que la ruta sea correcta

interface CartItem {
  id: number;
  productId: number;
  quantity: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
}

const CartPage = () => {
  const [storedUser] = useLocalStorage<string>('user', '');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const user = storedUser ? JSON.parse(storedUser) : null;
    if (user && user.id) {
      const fetchCart = async () => {
        const response = await fetch(`/api/cart?userId=${user.id}`, {
          method: 'GET',
        });
        if (response.ok) {
          const data = await response.json();
          setCartItems(data.items);
          calculateTotal(data.items);
        }
      };
      fetchCart();
    }

    const fetchProducts = async () => {
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    };
    fetchProducts();
  }, [storedUser]);

  const calculateTotal = (items: CartItem[]) => {
    const totalPrice = items.reduce((acc, item) => acc + (getProductPrice(item.productId) * item.quantity), 0);
    setTotal(totalPrice);
  };

  const getProductPrice = (productId: number) => {
    const found = products.find(product => product.id === productId);
    return found ? found.price : 0;
  };

  const getProductName = (productId: number) => {
    const found = products.find(product => product.id === productId);
    return found ? found.name : 'Producto desconocido';
  };



  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-gray-300 rounded-lg bg-gradient-to-r from-purple-400 to-blue-600 text-white shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Productos en tu cesta</h2>
            {cartItems.length === 0 ? (
              <p>No hay productos en la cesta.</p>
            ) : (
              cartItems.map(item => (
                <div key={item.id} className="flex justify-between mb-2">
                  <span>{getProductName(item.productId)}: {item.quantity}</span>
                  <span>Precio: {(getProductPrice(item.productId) * item.quantity).toFixed(2)}€</span>
                </div>
              ))
            )}
          </div>
          <div className="p-4 border border-gray-300 rounded-lg bg-white shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Resumen de Compra</h2>
            <p className="text-lg font-bold">Total: {total.toFixed(2)}€</p>
            <Link href="/checkout">
              <button className="mt-4 bg-blue-500 text-white px-6 py-3 rounded transition duration-300 transform hover:bg-blue-600 hover:scale-105 shadow-md">
                Comprar
              </button>
            </Link>
            <Link href="/shop">
              <button className="mt-2 bg-purple-500 text-white px-6 py-3 rounded transition duration-300 transform hover:bg-purple-600 hover:scale-105 shadow-md w-full">
                Volver a la tienda
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
