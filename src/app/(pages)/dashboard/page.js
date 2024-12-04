'use client';

import ProtectedRoute from '@/app/layout/Auth/ProtectedRoute';

const DashboardPage = () => {
    return (
        <ProtectedRoute roles={['guest']}>
            <div>
                <h1>Dashboard Page</h1>
            </div>
        </ProtectedRoute>
    );
};

export default DashboardPage;
