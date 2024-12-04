// src/app/components/LogoutButton.js

'use client';

import { useContext } from 'react';
import { AuthContext } from '@/app/context/AuthContext';

const LogoutButton = () => {
    const { logout } = useContext(AuthContext);

    const handleLogout = async () => {
        await logout();
    };

    return (
        <button
            onClick={handleLogout}
            className="text-sm px-4 py-2 rounded-sm text-white bg-red-500 hover:bg-red-600"
        >
            Çıkış Yap
        </button>
    );
};

export default LogoutButton;
