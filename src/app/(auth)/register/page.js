// src/app/register/page.js

'use client';

import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import Form from '@/app/components/ui/form/Form';
import Input from '@/app/components/ui/form/Input';
import Button from '@/app/components/ui/form/Button';
import Link from 'next/link';
import Image from 'next/image';

const RegisterPage = () => {
    const { user } = useContext(AuthContext);
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [role] = useState('guest'); // Varsayılan olarak 'guest' rolü
    const [errors, setErrors] = useState({ email: '', password: '', username: '', firstname: '', lastname: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            router.push('/');
        }
    }, [user, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password || !username || !firstname || !lastname) {
            setErrors({
                email: email ? '' : 'E-mail alanı boş olamaz',
                password: password ? '' : 'Şifre alanı boş olamaz',
                username: username ? '' : 'Kullanıcı adı',
                firstname: firstname ? '' : 'Ad alanı boş olamaz',
                lastname: lastname ? '' : 'Soyad alanı boş olamaz',
            });
            return;
        }

        setLoading(true);
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
                setErrors({ email: data.email ?? '', password: data.password ?? '', username: data.username ?? '', firstname: data.firstname ?? '', lastname: data.lastname ?? '' });
            }
        } catch (err) {
            console.log('Register error:', err);
            setErrors({ message: err.message ?? 'Bilinmeyen hata', email: '', password: '', username: '', firstname: '', lastname: '' });
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
                <div className="w-full max-w-sm">
                    <div className='mb-4'>
                        <h1 className="text-2xl font-bold mb-2">Sign Up</h1>
                        <p className='text-sm'>Create an account to continue</p>
                    </div>
                    <p className="text-red-500 text-xs">{errors.message}</p>
                    <Form onSubmit={handleSubmit} className="flex flex-col">
                        <Input
                            name="firstname"
                            type="firstname"
                            placeholder="First Name"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                            error={errors.firstname}
                        />
                        <Input
                            name="lastname"
                            type="lastname"
                            placeholder="Last Name"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            error={errors.lastname}
                        />
                        <Input
                            name="username"
                            type="username"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            error={errors.username}
                        />
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
                        <Button type="submit" variant="primary" className={"w-40"}>
                            {loading ? 'Kayıt Olunuyor...' : 'Kayıt Ol'}
                        </Button>
                    </Form>
                    <p className="mt-4 text-xs">
                        Zaten bir hesabınız var mı?{' '}
                        <Link href="/login" className="text-blue-700 hover:underline">
                            Giriş Yap
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
