// src/app/components/ProtectedRoute.js

'use client';

import { useContext, useEffect } from 'react';
import { AuthContext } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';

const ProtectedRoute = ({ children, roles }) => {
    const { user, loading } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push('/login');
            } else if (roles && !roles.includes(user.role)) {
                router.push('/403');
            }
        }
    }, [user, loading, roles, router]);

    if (loading || !user) {
        return <div>Yükleniyor...</div>;
    }

    return children;
};

export default ProtectedRoute;
