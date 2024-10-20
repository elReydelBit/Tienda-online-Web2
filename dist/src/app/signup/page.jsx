"use strict";
/*'use client'; // Marca este componente como un componente de cliente

import Link from 'next/link';
import { useState } from 'react';

export default function SignupPage() {
    // Estado para los campos del formulario
    const [formData, setFormData] = useState({
        username: '',
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
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Registro exitoso', data);
            } else {
                console.error('Error en el registro', data);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen relative" style={{ background: "linear-gradient(to right, #f0f0f0, #d9d9d9)", backgroundSize: "cover" }}>
            <div className="absolute inset-0 opacity-50">
                <svg className="w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", top: "0", left: "0", zIndex: "0" }}>
                    <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="10" />
                    <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="10" />
                    <circle cx="150" cy="150" r="40" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="10" />
                </svg>
            </div>
            <div className="relative bg-white p-8 rounded-2xl shadow-lg w-96 z-10">
                <h2 className="text-2xl font-bold mb-6 text-center text-black">Registrarse</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1 text-black" htmlFor="username">
                            Nombre de Usuario
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            placeholder="Ejemplo: usuario123"
                            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        />
                        <small className="text-gray-500">Introduce un nombre de usuario único</small>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1 text-black" htmlFor="email">
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
                            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        />
                        <small className="text-gray-500">Introduce un correo electrónico válido</small>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1 text-black" htmlFor="password">
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
                            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        />
                        <small className="text-gray-500">Introduce una contraseña segura</small>
                    </div>

                    <button type="submit" className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors">
                        Registrarse
                    </button>
                </form>

                <div className="mt-6 flex justify-between text-center">
                    <Link href="/" className="text-black hover:bg-black hover:text-white py-2 rounded-lg transition-colors mx-1 px-4 inline-block">
                        Volver al Inicio
                    </Link>
                    <Link href="/login" className="text-black hover:bg-black hover:text-white py-2 rounded-lg transition-colors mx-1 px-4 inline-block">
                        Iniciar Sesión
                    </Link>
                </div>
            </div>
        </div>
    );
}
*/
//src\app\signup\page.tsx
'use client';
/*'use client'; // Marca este componente como un componente de cliente

import Link from 'next/link';
import { useState } from 'react';

export default function SignupPage() {
    // Estado para los campos del formulario
    const [formData, setFormData] = useState({
        username: '',
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
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Registro exitoso', data);
            } else {
                console.error('Error en el registro', data);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen relative" style={{ background: "linear-gradient(to right, #f0f0f0, #d9d9d9)", backgroundSize: "cover" }}>
            <div className="absolute inset-0 opacity-50">
                <svg className="w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", top: "0", left: "0", zIndex: "0" }}>
                    <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="10" />
                    <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="10" />
                    <circle cx="150" cy="150" r="40" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="10" />
                </svg>
            </div>
            <div className="relative bg-white p-8 rounded-2xl shadow-lg w-96 z-10">
                <h2 className="text-2xl font-bold mb-6 text-center text-black">Registrarse</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1 text-black" htmlFor="username">
                            Nombre de Usuario
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            placeholder="Ejemplo: usuario123"
                            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        />
                        <small className="text-gray-500">Introduce un nombre de usuario único</small>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1 text-black" htmlFor="email">
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
                            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        />
                        <small className="text-gray-500">Introduce un correo electrónico válido</small>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1 text-black" htmlFor="password">
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
                            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        />
                        <small className="text-gray-500">Introduce una contraseña segura</small>
                    </div>

                    <button type="submit" className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors">
                        Registrarse
                    </button>
                </form>

                <div className="mt-6 flex justify-between text-center">
                    <Link href="/" className="text-black hover:bg-black hover:text-white py-2 rounded-lg transition-colors mx-1 px-4 inline-block">
                        Volver al Inicio
                    </Link>
                    <Link href="/login" className="text-black hover:bg-black hover:text-white py-2 rounded-lg transition-colors mx-1 px-4 inline-block">
                        Iniciar Sesión
                    </Link>
                </div>
            </div>
        </div>
    );
}
*/
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
exports.default = RegisterPage;
var react_1 = require("react");
var navigation_1 = require("next/navigation");
// Modal de error mejorado
var Modal = function (_a) {
    var message = _a.message, importantText = _a.importantText, onClose = _a.onClose;
    return (<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                    &#10005; {/* X de cierre */}
                </button>
                <h2 className="text-xl font-semibold mb-4 text-red-600 text-center">Error</h2>
                <p className="text-center mb-4">
                    {message}
                    {importantText && (<span className="font-bold text-red-600">{" ".concat(importantText)}</span>)}
                </p>
            </div>
        </div>);
};
function RegisterPage() {
    var _this = this;
    var _a = (0, react_1.useState)(''), username = _a[0], setUsername = _a[1];
    var _b = (0, react_1.useState)(''), email = _b[0], setEmail = _b[1];
    var _c = (0, react_1.useState)(''), password = _c[0], setPassword = _c[1];
    var _d = (0, react_1.useState)(false), loading = _d[0], setLoading = _d[1];
    var _e = (0, react_1.useState)(''), modalMessage = _e[0], setModalMessage = _e[1];
    var _f = (0, react_1.useState)(undefined), modalImportantText = _f[0], setModalImportantText = _f[1]; // Cambiado de null a undefined
    var _g = (0, react_1.useState)(null), errorField = _g[0], setErrorField = _g[1]; // Campo con error
    var router = (0, navigation_1.useRouter)(); // Hook para redirigir al usuario
    var validatePassword = function (password) {
        var hasUpperCase = /[A-Z]/.test(password);
        var hasLowerCase = /[a-z]/.test(password);
        var hasNumber = /\d/.test(password);
        var hasSpecialChar = /[@\-*#\/\\]/.test(password); // Solo permitidos: @, -, *, #, /, \
        var isLongEnough = password.length >= 8;
        return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isLongEnough;
    };
    var handleRegister = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var res, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    setLoading(true);
                    setErrorField(null); // Restablecer errores
                    // Validar campos
                    if (username.length < 3) {
                        setErrorField('username');
                        setModalMessage('El nombre de usuario debe tener al menos 3 caracteres.');
                        setModalImportantText('Nombre de usuario');
                        setUsername(''); // Limpiar el campo
                        setLoading(false);
                        return [2 /*return*/];
                    }
                    if (!validatePassword(password)) {
                        setErrorField('password');
                        setModalMessage('La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y los caracteres especiales (@, -, *, #, /, \\)');
                        setModalImportantText('Contraseña');
                        setPassword(''); // Limpiar el campo
                        setLoading(false);
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, 7, 8]);
                    return [4 /*yield*/, fetch('/api/auth/register', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ username: username, email: email, password: password }),
                        })];
                case 2:
                    res = _a.sent();
                    if (!res.ok) return [3 /*break*/, 3];
                    setModalMessage('Registro exitoso, redirigiendo...');
                    setModalImportantText(undefined); // Cambiado a undefined
                    setTimeout(function () {
                        router.push('/'); // Redirige a la página principal
                    }, 3000);
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, res.json()];
                case 4:
                    data = _a.sent();
                    // Si el usuario ya existe, limpiar todos los campos y mostrar borde rojo
                    if (data.message === 'Usuario ya existe') {
                        setErrorField('all'); // Marcar todos los campos como erróneos
                        setUsername(''); // Limpiar el campo
                        setEmail(''); // Limpiar el campo
                        setPassword(''); // Limpiar el campo
                        setModalMessage('El usuario ya existe, por favor intenta con otro correo o nombre de usuario.');
                        setModalImportantText('Usuario existente');
                    }
                    else {
                        setModalMessage(data.message || 'Error en el registro');
                        setModalImportantText(undefined); // Cambiado a undefined
                    }
                    _a.label = 5;
                case 5: return [3 /*break*/, 8];
                case 6:
                    error_1 = _a.sent();
                    setModalMessage('Error en la conexión con el servidor');
                    setModalImportantText(undefined); // Cambiado a undefined
                    return [3 /*break*/, 8];
                case 7:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    }); };
    return (<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 to-blue-600">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Registrarse</h1>

                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700">Nombre de Usuario:</label>
                        <input type="text" id="username" className={"w-full p-2 border ".concat(errorField === 'username' || errorField === 'all' ? 'border-red-500' : 'border-gray-300', " rounded mt-1")} value={username} onChange={function (e) { return setUsername(e.target.value); }} required minLength={3}/>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email:</label>
                        <input type="email" id="email" className={"w-full p-2 border ".concat(errorField === 'email' || errorField === 'all' ? 'border-red-500' : 'border-gray-300', " rounded mt-1")} value={email} onChange={function (e) { return setEmail(e.target.value); }} required/>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">Contraseña:</label>
                        <input type="password" id="password" className={"w-full p-2 border ".concat(errorField === 'password' || errorField === 'all' ? 'border-red-500' : 'border-gray-300', " rounded mt-1")} value={password} onChange={function (e) { return setPassword(e.target.value); }} required placeholder="Mínimo 8 caracteres"/>
                        <small className="text-gray-500">Debe incluir mayúsculas, minúsculas, números y @, -, *, #, /, \</small>
                    </div>

                    <button type="submit" className="w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition" disabled={loading}>
                        {loading ? 'Registrando...' : 'Registrarse'}
                    </button>
                </form>

                {/* Botón para volver a la portada */}
                <button className="mt-4 w-full text-purple-500 underline" onClick={function () { return router.push('/'); }}>
                    Volver a la portada
                </button>
            </div>

            {/* Modal de alerta */}
            {modalMessage && (<Modal message={modalMessage} importantText={modalImportantText} onClose={function () {
                setModalMessage('');
                setModalImportantText(undefined); // Cambiado a undefined
            }}/>)}
        </div>);
}
