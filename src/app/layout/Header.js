// src/app/components/Header.js

'use client';

import { useContext } from 'react';
import { AuthContext } from '@/app/context/AuthContext';
import Link from 'next/link';
import LogoutButton from '@/app/layout/LogoutButton';

const Header = () => {
    const { user } = useContext(AuthContext);

    return (
        <header className="fixed top-0 z-50 w-full overflow-hidden p-4 h-20 flex justify-between items-center bg-gray-50">
            <div className="text-xl font-bold">
                <Link href="/">
                    Logo
                </Link>
            </div>
            <nav className="flex items-center">
                {user ? (
                    <>
                        <span className="mr-4 text-sm">Merhaba, {user.name}</span>
                        <LogoutButton />
                    </>
                ) : (
                    <>
                        <div className='text-sm'>
                            <Link href="/login" className="mr-4">
                                Giriş Yap
                            </Link>
                            <Link href="/register">
                                Kayıt Ol
                            </Link>
                        </div>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;
