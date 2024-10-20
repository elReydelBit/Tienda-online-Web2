"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NavBar;
var react_1 = require("react");
var link_1 = __importDefault(require("next/link"));
var navigation_1 = require("next/navigation");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var fa_1 = require("react-icons/fa");
var fi_1 = require("react-icons/fi");
function NavBar() {
    var _a = (0, react_1.useState)(false), isAuthenticated = _a[0], setIsAuthenticated = _a[1];
    var _b = (0, react_1.useState)(null), user = _b[0], setUser = _b[1];
    var _c = (0, react_1.useState)(false), dropdownOpen = _c[0], setDropdownOpen = _c[1];
    var _d = (0, react_1.useState)(''), logoutMessage = _d[0], setLogoutMessage = _d[1];
    var _e = (0, react_1.useState)(0), cartCount = _e[0], setCartCount = _e[1]; // Añadir estado para la cuenta de la cesta
    var router = (0, navigation_1.useRouter)();
    var pathname = (0, navigation_1.usePathname)();
    (0, react_1.useEffect)(function () {
        var token = localStorage.getItem('token');
        if (token) {
            try {
                var decoded = jsonwebtoken_1.default.decode(token);
                if (decoded) {
                    setUser(decoded);
                    setIsAuthenticated(true);
                }
            }
            catch (error) {
                console.error("Token inválido:", error);
                setIsAuthenticated(false);
            }
        }
        // Cargar el número de productos en la cesta
        var savedCart = localStorage.getItem('cart');
        if (savedCart) {
            var cartItems = JSON.parse(savedCart);
            var totalCount = cartItems.reduce(function (acc, item) { return acc + item.quantity; }, 0);
            setCartCount(totalCount);
        }
    }, []);
    var handleLogout = function () {
        if (user) {
            var userName = user.name;
            localStorage.removeItem('token');
            setIsAuthenticated(false);
            setUser(null);
            setLogoutMessage("Adi\u00F3s, ".concat(userName));
            setTimeout(function () {
                setLogoutMessage('');
                router.push('/');
            }, 3000);
        }
    };
    var toggleDropdown = function () {
        setDropdownOpen(!dropdownOpen);
    };
    var getTitleByPath = function (path) {
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
    return (<nav className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-6 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <link_1.default href="/" className="text-2xl font-bold hover:underline">
            {getTitleByPath(pathname)}
          </link_1.default>
        </div>

        <div className="flex items-center space-x-8">
          <link_1.default href="/">
            <fa_1.FaHome className="text-2xl hover:text-gray-300 cursor-pointer"/>
          </link_1.default>

          {isAuthenticated ? (<>
              <link_1.default href="/cart" className="flex items-center">
                <span className="mr-2">Cesta</span> {/* Palabra "Cesta" a la izquierda */}
                <div className="relative">
                  <fa_1.FaShoppingCart className="text-2xl hover:text-gray-300 cursor-pointer"/>
                  {cartCount > 0 && (<span className="absolute top-[-0.5rem] right-[-0.5rem] bg-red-600 text-white text-xs font-bold rounded-full px-1">
                      {cartCount}
                    </span>)}
                </div>
              </link_1.default>

              <div className="relative">
                <div className="flex items-center cursor-pointer space-x-2" onClick={toggleDropdown}>
                  <fi_1.FiUser className="text-2xl"/>
                  <span>{user === null || user === void 0 ? void 0 : user.name}</span>
                </div>

                {dropdownOpen && (<div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg">
                    <link_1.default href="/profile" className="block px-4 py-2 hover:bg-gray-100">
                      Perfil
                    </link_1.default>
                    <link_1.default href="/settings" className="block px-4 py-2 hover:bg-gray-100">
                      Ajustes
                    </link_1.default>
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={handleLogout}>
                      Cerrar sesión
                    </button>
                  </div>)}
              </div>
            </>) : (<>
              <link_1.default href="/login" className="text-xl hover:underline">
                Iniciar sesión
              </link_1.default>
              <link_1.default href="/signup" className="text-xl hover:underline">
                Registrarse
              </link_1.default>
            </>)}
        </div>
      </div>

      {logoutMessage && <p className="mt-2 text-center text-red-300">{logoutMessage}</p>}
    </nav>);
}
