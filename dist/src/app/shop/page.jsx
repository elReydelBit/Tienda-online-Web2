"use strict";
//src\app\shop\page.tsx
/*'use client'; // Marca este componente como un componente de cliente
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Layout from '@/app/components/Layout';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

export default function Tienda() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <Layout>
      <h2 className="text-2xl font-semibold mb-6">Lista de Productos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-700 mb-2">{product.description}</p>
              <p className="font-bold text-xl text-purple-600">${product.price.toFixed(2)}</p>
              <button className="mt-4 bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition">
                Añadir a la cesta
              </button>
            </div>
          ))
        ) : (
          <p>No hay productos disponibles.</p>
        )}
      </div>
    </Layout>
  );
}
*/
'use client';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Tienda;
var react_1 = require("react");
var Layout_1 = __importDefault(require("@/app/components/Layout"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function Tienda() {
    var _this = this;
    var _a = (0, react_1.useState)([]), products = _a[0], setProducts = _a[1];
    var _b = (0, react_1.useState)(function () {
        if (typeof window !== 'undefined') {
            var savedCart = localStorage.getItem('cart');
            return savedCart ? JSON.parse(savedCart) : [];
        }
        return [];
    }), cart = _b[0], setCart = _b[1];
    var _c = (0, react_1.useState)(false), isAuthenticated = _c[0], setIsAuthenticated = _c[1];
    var _d = (0, react_1.useState)(null), user = _d[0], setUser = _d[1];
    (0, react_1.useEffect)(function () {
        var fetchProducts = function () { return __awaiter(_this, void 0, void 0, function () {
            var response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('/api/products')];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        setProducts(data);
                        return [2 /*return*/];
                }
            });
        }); };
        var token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
            var decoded = jsonwebtoken_1.default.decode(token);
            setUser(decoded);
        }
        fetchProducts();
    }, []);
    var addToCart = function (productId, quantity) { return __awaiter(_this, void 0, void 0, function () {
        var updatedCart, existingItemIndex, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    updatedCart = __spreadArray([], cart, true);
                    existingItemIndex = updatedCart.findIndex(function (item) { return item.productId === productId; });
                    if (existingItemIndex > -1) {
                        updatedCart[existingItemIndex].quantity += quantity;
                    }
                    else {
                        updatedCart.push({ productId: productId, quantity: quantity });
                    }
                    setCart(updatedCart);
                    localStorage.setItem('cart', JSON.stringify(updatedCart));
                    if (!(isAuthenticated && user)) return [3 /*break*/, 2];
                    return [4 /*yield*/, fetch('/api/cart', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': "Bearer ".concat(localStorage.getItem('token')),
                            },
                            body: JSON.stringify({
                                userId: user.id,
                                productId: productId,
                                quantity: quantity
                            })
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        console.error('Error al añadir al carrito:', response.statusText);
                    }
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); };
    var handleAddToCart = function (productId) {
        if (!isAuthenticated) {
            alert('Debes iniciar sesión para añadir productos a la cesta.');
            return;
        }
        var quantity = parseInt(document.getElementById("quantity-".concat(productId)).value);
        if (isNaN(quantity) || quantity < 1) {
            alert('Por favor, introduce una cantidad válida.');
            return;
        }
        addToCart(productId, quantity);
    };
    return (<Layout_1.default>
      <h1 className="text-center text-2xl font-bold mb-6">Lista de Productos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length > 0 ? (products.map(function (product) { return (<div key={product.id} className="border rounded-lg p-4 shadow-md flex flex-col">
              <h2 className="font-semibold text-lg">{product.name}</h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="mt-2 text-xl font-bold">${product.price.toFixed(2)}</p>
              <div className="flex items-center mt-2 w-full">
                <input type="number" min="1" defaultValue="1" id={"quantity-".concat(product.id)} className="border rounded p-1 w-1/2 mr-2"/>
                <button onClick={function () { return handleAddToCart(product.id); }} className="bg-gradient-to-r from-purple-400 to-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300 w-1/2">
                  Añadir a la cesta
                </button>
              </div>
            </div>); })) : (<p>No hay productos disponibles.</p>)}
      </div>
    </Layout_1.default>);
}
