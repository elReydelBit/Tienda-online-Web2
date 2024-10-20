'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useLocalStorage from '../hooks/useLocalStorage'; // Asegúrate de que la ruta sea correcta

const Modal = ({ message, importantText, onClose }: { message: string; importantText?: string; onClose: () => void }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    &#10005;
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

export default function LoginPage() {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalImportantText, setModalImportantText] = useState<string | undefined>(undefined);
    const router = useRouter();
    const [, setUserId] = useLocalStorage<string>('userId', '');
    const [, setUserToken] = useLocalStorage<string>('token', '');
    const [, setUser] = useLocalStorage<string>('user', '');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!identifier) {
            setModalMessage('Por favor ingresa tu email o nombre de usuario.');
            setModalImportantText('Identificación');
            setLoading(false);
            return;
        }

        if (!password) {
            setModalMessage('Por favor ingresa tu contraseña.');
            setModalImportantText('Contraseña');
            setLoading(false);
            return;
        }

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ identifier, password }),
            });

            const data = await res.json();

            if (res.ok) {
                if (data.token && data.user) {
                    setUserToken(data.token);
                    setUserId(data.user.id.toString());
                    setUser(JSON.stringify(data.user));
                }
                
                setModalMessage('Inicio de sesión exitoso, redirigiendo...');
                setModalImportantText(undefined);
                setTimeout(() => {
                    router.push('/');
                }, 1500);
            } else {
                setModalMessage(data.error || 'Error en el inicio de sesión');
                setModalImportantText('Credenciales incorrectas');
                setPassword('');
            }
        } catch (error) {
            setModalMessage('Error en la conexión con el servidor');
            setModalImportantText(undefined);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 to-blue-600">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h1>

                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="identifier" className="block text-gray-700">Email o Nombre de Usuario:</label>
                        <input
                            type="text"
                            id="identifier"
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">Contraseña:</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition"
                        disabled={loading}
                    >
                        {loading ? 'Iniciando...' : 'Iniciar Sesión'}
                    </button>
                </form>

                <div className="flex justify-between mt-4 text-sm">
                    <button
                        className="text-purple-500 underline"
                        onClick={() => router.push('/signup')}
                    >
                        ¿No tienes cuenta? Regístrate aquí
                    </button>
                    <button
                        className="text-purple-500 underline"
                        onClick={() => router.push('/')}
                    >
                        Volver a la portada
                    </button>
                </div>
            </div>

            {modalMessage && (
                <Modal
                    message={modalMessage}
                    importantText={modalImportantText}
                    onClose={() => {
                        setModalMessage('');
                        setModalImportantText(undefined);
                    }}
                />
            )}
        </div>
    );
}
