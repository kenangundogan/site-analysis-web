'use client';

import ProtectedRoute from '@/app/layout/Auth/ProtectedRoute';

const GuestPage = () => {
    return (
        <ProtectedRoute roles={['guest', 'admin']}>
            <div>
                <h1>Guest Page</h1>
            </div>
        </ProtectedRoute>
    );
};

export default GuestPage;
