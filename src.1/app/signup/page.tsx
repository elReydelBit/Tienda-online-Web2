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
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Modal de error mejorado
const Modal = ({ message, importantText, onClose }: { message: string; importantText?: string; onClose: () => void }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    &#10005; {/* X de cierre */}
                </button>
                <h2 className="text-xl font-semibold mb-4 text-red-600 text-center">Error</h2>
                <p className="text-center mb-4">
                    {message}
                    {importantText && (
                        <span className="font-bold text-red-600">{` ${importantText}`}</span>
                    )}
                </p>
            </div>
        </div>
    );
};

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalImportantText, setModalImportantText] = useState<string | undefined>(undefined); // Cambiado de null a undefined
    const [errorField, setErrorField] = useState<string | null>(null); // Campo con error
    const router = useRouter(); // Hook para redirigir al usuario

    const validatePassword = (password: string) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[@\-*#\/\\]/.test(password); // Solo permitidos: @, -, *, #, /, \
        const isLongEnough = password.length >= 8;

        return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isLongEnough;
    };

    const handleRegister = async (e: React.FormEvent) => {
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
            return;
        }

        if (!validatePassword(password)) {
            setErrorField('password');
            setModalMessage('La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y los caracteres especiales (@, -, *, #, /, \\)');
            setModalImportantText('Contraseña');
            setPassword(''); // Limpiar el campo
            setLoading(false);
            return;
        }

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (res.ok) {
                setModalMessage('Registro exitoso, redirigiendo...');
                setModalImportantText(undefined); // Cambiado a undefined
                setTimeout(() => {
                    router.push('/'); // Redirige a la página principal
                }, 3000);
            } else {
                const data = await res.json();
                
                // Si el usuario ya existe, limpiar todos los campos y mostrar borde rojo
                if (data.message === 'Usuario ya existe') {
                    setErrorField('all'); // Marcar todos los campos como erróneos
                    setUsername(''); // Limpiar el campo
                    setEmail(''); // Limpiar el campo
                    setPassword(''); // Limpiar el campo
                    setModalMessage('El usuario ya existe, por favor intenta con otro correo o nombre de usuario.');
                    setModalImportantText('Usuario existente');
                } else {
                    setModalMessage(data.message || 'Error en el registro');
                    setModalImportantText(undefined); // Cambiado a undefined
                }
            }
        } catch (error) {
            setModalMessage('Error en la conexión con el servidor');
            setModalImportantText(undefined); // Cambiado a undefined
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 to-blue-600">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Registrarse</h1>

                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700">Nombre de Usuario:</label>
                        <input
                            type="text"
                            id="username"
                            className={`w-full p-2 border ${errorField === 'username' || errorField === 'all' ? 'border-red-500' : 'border-gray-300'} rounded mt-1`}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            minLength={3}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email:</label>
                        <input
                            type="email"
                            id="email"
                            className={`w-full p-2 border ${errorField === 'email' || errorField === 'all' ? 'border-red-500' : 'border-gray-300'} rounded mt-1`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">Contraseña:</label>
                        <input
                            type="password"
                            id="password"
                            className={`w-full p-2 border ${errorField === 'password' || errorField === 'all' ? 'border-red-500' : 'border-gray-300'} rounded mt-1`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Mínimo 8 caracteres"
                        />
                        <small className="text-gray-500">Debe incluir mayúsculas, minúsculas, números y @, -, *, #, /, \</small>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition"
                        disabled={loading}
                    >
                        {loading ? 'Registrando...' : 'Registrarse'}
                    </button>
                </form>

                {/* Botón para volver a la portada */}
                <button
                    className="mt-4 w-full text-purple-500 underline"
                    onClick={() => router.push('/')}
                >
                    Volver a la portada
                </button>
            </div>

            {/* Modal de alerta */}
            {modalMessage && (
                <Modal
                    message={modalMessage}
                    importantText={modalImportantText}
                    onClose={() => {
                        setModalMessage('');
                        setModalImportantText(undefined); // Cambiado a undefined
                    }}
                />
            )}
        </div>
    );
}

