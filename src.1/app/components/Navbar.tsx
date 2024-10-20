'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { FaShoppingCart, FaHome } from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';
import useLocalStorage from '../hooks/useLocalStorage'; // Asegúrate de que la ruta sea correcta

interface User {
  id: string;
  name: string;
}

export default function NavBar() {
  const [isClient, setIsClient] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const router = useRouter();
  const pathname = usePathname();

  const [storedToken] = useLocalStorage<string>('token', '');
  const [storedUser] = useLocalStorage<string>('user', '');

  useEffect(() => {
    setIsClient(true);

    if (storedToken && storedUser) {
      try {
        const userObj = JSON.parse(storedUser);
        setUser(userObj);
        setIsAuthenticated(true);
        fetchCartCount(userObj.id);
      } catch (error) {
        console.error("Error al procesar la información del usuario:", error);
        setIsAuthenticated(false);
      }
    }
  }, [storedToken, storedUser]);

  const fetchCartCount = async (userId: string) => {
    try {
      const response = await fetch(`/api/cart?userId=${userId}`);
      const cart = await response.json();
      const totalCount = cart.items.reduce((acc: number, item: { quantity: number }) => acc + item.quantity, 0);
      setCartCount(totalCount);
    } catch (error) {
      console.error("Error al obtener la cesta:", error);
    }
  };

  const handleLogout = () => {
    if (user) {
      const userName = user.name;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setIsAuthenticated(false);
      setUser(null);
      setLogoutMessage(`Adiós, ${userName}`);

      setTimeout(() => {
        setLogoutMessage('');
        router.push('/');
      }, 3000);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const getTitleByPath = (path: string) => {
    switch (path) {
      case '/':
        return 'Bienvenido a la tienda';
      case '/shop':
        return 'Nuestra tienda';
      case '/checkout':
        return 'Pasarela de pago';
      case '/cart':
        return 'Cesta';
      default:
        return 'Tienda';
    }
  };

  if (!isClient) {
    return <nav className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-6 text-white shadow-lg">
      <div className="container mx-auto">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold hover:underline">
            Cargando...
          </Link>
        </div>
      </div>
    </nav>;
  }

  return (
    <nav className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-6 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold hover:underline">
            {getTitleByPath(pathname)}
          </Link>
        </div>

        <div className="flex items-center space-x-8">
          <Link href="/">
            <FaHome className="text-2xl hover:text-gray-300 cursor-pointer" />
          </Link>

          {isAuthenticated ? (
            <>
              <Link href="/cart" className="flex items-center">
                <span className="mr-2">Cesta</span>
                <div className="relative">
                  <FaShoppingCart className="text-2xl hover:text-gray-300 cursor-pointer" />
                  {cartCount > 0 && (
                    <span className="absolute top-[-0.5rem] right-[-0.5rem] bg-red-600 text-white text-xs font-bold rounded-full px-1">
                      {cartCount}
                    </span>
                  )}
                </div>
              </Link>

              <div className="relative">
                <div
                  className="flex items-center cursor-pointer space-x-2"
                  onClick={toggleDropdown}
                >
                  <FiUser className="text-2xl" />
                  <span>{user?.name}</span>
                </div>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg">
                    <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">
                      Perfil
                    </Link>
                    <Link href="/settings" className="block px-4 py-2 hover:bg-gray-100">
                      Ajustes
                    </Link>
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link href="/login" className="text-xl hover:underline">
                Iniciar sesión
              </Link>
              <Link href="/signup" className="text-xl hover:underline">
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>

      {logoutMessage && <p className="mt-2 text-center text-red-300">{logoutMessage}</p>}
    </nav>
  );
}
