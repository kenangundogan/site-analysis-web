'use client';

import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import Form from '@/app/components/ui/form/Form';
import Input from '@/app/components/ui/form/Input';
import Button from '@/app/components/ui/form/Button';
import Link from 'next/link';
import Image from 'next/image';

const LoginPage = () => {
    const { login, user } = useContext(AuthContext);
    const router = useRouter();
    const [email, setEmail] = useState('');
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
            await login(email, password);
            router.push('/');
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
        setLoading(false);
    };

    return (
        <div className='w-full min-h-screen p-8 flex flex-wrap'>
            <div className='w-1/2 p-8 bg-blue-700'>
                <div className='w-full h-full flex justify-center items-center'>
                    <Image
                        src='/logo/logo.svg'
                        alt='Login Image'
                        width={100}
                        height={100}
                    />
                </div>
            </div>
            <div className='w-1/2 p-8 flex justify-center items-center bg-gray-50'>
                <div className="w-full max-w-xs">
                    <div className='mb-4 text-center'>
                        <h1 className="text-2xl font-bold mb-2">Sign In</h1>
                        <p className='text-sm'>Sign in to your account to continue</p>
                    </div>
                    {error && <p className="text-red-500 mb-4 text-xs">{error}</p>}
                    <Form onSubmit={handleSubmit} className="flex flex-col">
                        <Input
                            label="E-mail"
                            name="email"
                            type="email"
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button type="submit" variant="primary">
                            {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
                        </Button>
                    </Form>
                    <p className="mt-4 text-center text-xs">
                        Hesabınız yok mu?{' '}
                        <Link href="/register" className="text-blue-500 hover:underline">
                            Kayıt Ol
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
