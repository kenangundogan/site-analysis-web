'use client';

import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const LoginPage = () => {
    const { login, user } = useContext(AuthContext);
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
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
        try {
            await login(username, password);
            router.push('/');
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    return (
        <div className="w-full max-w-sm p-8 bg-white rounded-sm shadow-xl">
            <h1 className="text-2xl font-bold mb-6 text-center">Giriş Yap</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col">
                <input
                    type="text"
                    placeholder="Kullanıcı Adı"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                    className="px-4 py-2 bg-blue-500 text-white rounded-sm hover:bg-blue-600 disabled:opacity-50"
                >
                    {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
                </button>
            </form>
            <p className="mt-4 text-center">
                Hesabınız yok mu?{' '}
                <Link href="/register" className="text-blue-500 hover:underline">
                    Kayıt Ol
                </Link>
            </p>
        </div>
    );
};

export default LoginPage;
