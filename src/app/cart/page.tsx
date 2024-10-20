'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Layout from '../components/Layout';
import useLocalStorage from '../hooks/useLocalStorage';


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

//pasamos el valor de total y lo inicializamos
export let total_Pasado= 0.0;
 

export const CartPage = () => {
  const router = useRouter();
  const [storedUser] = useLocalStorage<string>('user', '');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useLocalStorage<number>('cartTotal', 0);

  useEffect(() => {
    const user = storedUser ? JSON.parse(storedUser) : null;
    
    if (user && user.id) {
      const fetchCart = async () => {
        try {
          const response = await fetch(`/api/cart?userId=${user.id}`, { method: 'GET' });
          if (response.ok) {
            const data = await response.json();
            setCartItems(data.items);
          } else {
            console.error('Error fetching cart data:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching cart:', error);
        }
      };
      fetchCart();
    }

    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error('Error fetching products:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [storedUser]);

  useEffect(() => {
    if (cartItems.length > 0 && products.length > 0) {
      calculateTotal(cartItems);
    }
  }, [cartItems, products]);

  const calculateTotal = (items: CartItem[]) => {
    const totalPrice = items.reduce((acc, item) => 
      acc + (getProductPrice(item.productId) * item.quantity), 0);
    setTotal(totalPrice); 
    //tomamos el valor de nuevo
    total_Pasado=totalPrice;
  };

  const getProductPrice = (productId: number) => {
    const found = products.find(product => product.id === productId);
    return found ? found.price : 0;
  };

  const getProductName = (productId: number) => {
    const found = products.find(product => product.id === productId);
    return found ? found.name : 'Producto desconocido';
  };

  const handleCheckout = () => {
    // Guardar el estado actual del carrito y total
    localStorage.setItem('checkoutData', JSON.stringify({
      cartItems,
      total,
      timestamp: Date.now()
    }));
    router.push('/checkout');
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

            <button
              onClick={handleCheckout}
              className={`mt-4 px-6 py-3 rounded transition duration-300 transform shadow-md w-full
                ${total > 0 ? 'bg-blue-500 hover:bg-blue-600 hover:scale-105' : 'bg-gray-400 cursor-not-allowed'}`}
              disabled={total === 0}
            >
              Proceder al pago
            </button>

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
