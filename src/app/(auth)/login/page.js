// src/app/(auth)/login/page.js

'use client';

import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import Form from '@/app/components/ui/form/Form';
import Input from '@/app/components/ui/form/Input';
import Button from '@/app/components/ui/form/Button';
import Link from 'next/link';
import Image from 'next/image';
import { validateField } from '@/app/lib/validation';

const LoginPage = () => {
    const { login, user } = useContext(AuthContext);
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            router.push('/');
        }
    }, [user, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Alanları doğrula
        const emailError = validateField('email', email);
        const passwordError = validateField('password', password);
        setErrors({ email: emailError, password: passwordError });

        if (emailError || passwordError) return;

        setLoading(true);
        try {
            await login(email, password);
            router.push('/');
        } catch (err) {
            console.log('Login error:', err);
            if (err.email || err.password) {
                setErrors({
                    email: err.email ?? '',
                    password: err.password ?? ''
                });
            } else {
                setErrors({
                    email: err.message ?? 'Bilinmeyen hata',
                    password: ''
                });
            }
        }
        setLoading(false);
    };

    return (
        <div className='w-full min-h-screen p-4 sm:p-10 flex flex-wrap'>
            <div className='w-full md:w-6/12 lg:w-8/12 p-8 bg-blue-700'>
                <div className='w-full h-full flex justify-center items-center'>
                    <Image
                        src='/logo/logo.svg'
                        alt='Login Image'
                        width={100}
                        height={100}
                    />
                </div>
            </div>
            <div className='w-full md:w-6/12 lg:w-4/12 p-8 border flex justify-center items-center bg-grasy-50'>
                <div className="w-full max-w-xs">
                    <div className='mb-4'>
                        <h1 className="text-2xl font-bold mb-2">Sign In</h1>
                        <p className='text-sm'>Sign in to your account to continue</p>
                    </div>
                    <Form onSubmit={handleSubmit} className="flex flex-col">
                        <Input
                            name="email"
                            type="email"
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={errors.email}
                        />
                        <Input
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={errors.password}
                        />
                        <Button type="submit" variant="primary" className={"w-40"} disabled={loading}>
                            {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
                        </Button>
                    </Form>
                    <p className="mt-4 text-xs">
                        Hesabınız yok mu?{' '}
                        <Link href="/register" className="text-blue-700 hover:underline">
                            Kayıt Ol
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
