"use strict";
/*'use client'; // Marca este componente como un componente de cliente
import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
    // Estado para los campos del formulario
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // Función para manejar cambios en los campos de texto
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token); // Guardamos el token en localStorage
                console.log('Inicio de sesión exitoso', data);
            } else {
                console.error('Error en el inicio de sesión', data);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
            <svg
                className="absolute top-0 left-0 w-full h-full opacity-10"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid slice"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <pattern id="pattern" patternUnits="userSpaceOnUse" width="20" height="20">
                        <circle cx="10" cy="10" r="8" fill="#000" opacity="0.1" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#pattern)" />
            </svg>

            <div className="bg-white p-8 rounded-lg shadow-lg w-96 z-10">
                <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="email">
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="ejemplo@correo.com"
                            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="password">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="Mínimo 8 caracteres"
                            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                        />
                    </div>

                    <button type="submit" className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors">
                        Iniciar Sesión
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <Link href="/" className="text-gray-600 hover:underline">Volver al Inicio</Link>
                </div>
            </div>
        </div>
    );
}*/
//src\app\login\page.tsx
'use client';
/*'use client'; // Marca este componente como un componente de cliente
import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
    // Estado para los campos del formulario
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // Función para manejar cambios en los campos de texto
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token); // Guardamos el token en localStorage
                console.log('Inicio de sesión exitoso', data);
            } else {
                console.error('Error en el inicio de sesión', data);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
            <svg
                className="absolute top-0 left-0 w-full h-full opacity-10"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid slice"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <pattern id="pattern" patternUnits="userSpaceOnUse" width="20" height="20">
                        <circle cx="10" cy="10" r="8" fill="#000" opacity="0.1" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#pattern)" />
            </svg>

            <div className="bg-white p-8 rounded-lg shadow-lg w-96 z-10">
                <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="email">
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="ejemplo@correo.com"
                            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="password">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="Mínimo 8 caracteres"
                            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                        />
                    </div>

                    <button type="submit" className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors">
                        Iniciar Sesión
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <Link href="/" className="text-gray-600 hover:underline">Volver al Inicio</Link>
                </div>
            </div>
        </div>
    );
}*/
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LoginPage;
var react_1 = require("react");
var navigation_1 = require("next/navigation");
var Modal = function (_a) {
    var message = _a.message, importantText = _a.importantText, onClose = _a.onClose;
    return (<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                    &#10005;
                </button>
                <h2 className="text-xl font-semibold mb-4 text-red-600 text-center">Error</h2>
                <p className="text-center mb-4">
                    {message}
                    {importantText && (<span className="font-bold text-red-600">{" ".concat(importantText)}</span>)}
                </p>
            </div>
        </div>);
};
function LoginPage() {
    var _this = this;
    var _a = (0, react_1.useState)(''), identifier = _a[0], setIdentifier = _a[1]; // Cambiado de email a identifier
    var _b = (0, react_1.useState)(''), password = _b[0], setPassword = _b[1];
    var _c = (0, react_1.useState)(false), loading = _c[0], setLoading = _c[1];
    var _d = (0, react_1.useState)(''), modalMessage = _d[0], setModalMessage = _d[1];
    var _e = (0, react_1.useState)(undefined), modalImportantText = _e[0], setModalImportantText = _e[1];
    var router = (0, navigation_1.useRouter)();
    var handleLogin = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var res, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    setLoading(true);
                    if (!identifier) {
                        setModalMessage('Por favor ingresa tu email o nombre de usuario.');
                        setModalImportantText('Identificación');
                        setLoading(false);
                        return [2 /*return*/];
                    }
                    if (!password) {
                        setModalMessage('Por favor ingresa tu contraseña.');
                        setModalImportantText('Contraseña');
                        setLoading(false);
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, fetch('/api/auth/login', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ identifier: identifier, password: password }), // Cambiado de email a identifier
                        })];
                case 2:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 3:
                    data = _a.sent();
                    if (res.ok) {
                        // Guardar el token en localStorage
                        if (data.token) {
                            localStorage.setItem('token', data.token);
                            localStorage.setItem('user', JSON.stringify(data.user));
                        }
                        setModalMessage('Inicio de sesión exitoso, redirigiendo...');
                        setModalImportantText(undefined);
                        setTimeout(function () {
                            router.push('/');
                        }, 1500);
                    }
                    else {
                        setModalMessage(data.error || 'Error en el inicio de sesión');
                        setModalImportantText('Credenciales incorrectas');
                        setPassword(''); // Limpiar la contraseña en caso de error
                    }
                    return [3 /*break*/, 6];
                case 4:
                    error_1 = _a.sent();
                    setModalMessage('Error en la conexión con el servidor');
                    setModalImportantText(undefined);
                    return [3 /*break*/, 6];
                case 5:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    return (<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 to-blue-600">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h1>

                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="identifier" className="block text-gray-700">Email o Nombre de Usuario:</label>
                        <input type="text" id="identifier" className="w-full p-2 border border-gray-300 rounded mt-1" value={identifier} onChange={function (e) { return setIdentifier(e.target.value); }} required/>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">Contraseña:</label>
                        <input type="password" id="password" className="w-full p-2 border border-gray-300 rounded mt-1" value={password} onChange={function (e) { return setPassword(e.target.value); }} required/>
                    </div>

                    <button type="submit" className="w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition" disabled={loading}>
                        {loading ? 'Iniciando...' : 'Iniciar Sesión'}
                    </button>
                </form>

                <div className="flex justify-between mt-4 text-sm">
                    <button className="text-purple-500 underline" onClick={function () { return router.push('/signup'); }}>
                        ¿No tienes cuenta? Regístrate aquí
                    </button>
                    <button className="text-purple-500 underline" onClick={function () { return router.push('/'); }}>
                        Volver a la portada
                    </button>
                </div>
            </div>

            {modalMessage && (<Modal message={modalMessage} importantText={modalImportantText} onClose={function () {
                setModalMessage('');
                setModalImportantText(undefined);
            }}/>)}
        </div>);
}
