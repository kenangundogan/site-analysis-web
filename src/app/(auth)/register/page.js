// src/app/register/page.js

'use client';

import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const RegisterPage = () => {
    const { user } = useContext(AuthContext);
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [role] = useState('guest'); // Varsayılan olarak 'guest' rolü
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            router.push('/');
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password, email, username, firstname, lastname, role }),
            });

            const data = await response.json();

            if (response.ok) {
                router.push('/login');
            } else {
                setError(data.message || 'Kayıt başarısız');
            }
        } catch (err) {
            setError('Sunucu hatası');
        }

        setLoading(false);
    };

    return (
        <div className="w-full max-w-sm p-8 bg-white rounded-sm shadow-xl">
            <h1 className="text-2xl font-bold mb-6 text-center">Kayıt Ol</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col">
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    required
                    className="mb-4 p-2 border rounded-sm"
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    required
                    className="mb-4 p-2 border rounded-sm"
                />
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="mb-4 p-2 border rounded-sm"
                />
                <input
                    type="text"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mb-4 p-2 border rounded-sm"
                />
                <input
                    type="password"
                    placeholder="Şifre"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mb-4 p-2 border rounded-sm"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-green-500 text-white rounded-sm hover:bg-green-600 disabled:opacity-50"
                >
                    {loading ? 'Kayıt Oluyor...' : 'Kayıt Ol'}
                </button>
            </form>
            <p className="mt-4 text-center">
                Zaten bir hesabınız var mı?{' '}
                <Link href="/login" className="text-blue-500 hover:underline">
                    Giriş Yap
                </Link>
            </p>
        </div>
    );
};

export default RegisterPage;
