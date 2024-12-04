'use client';

import ProtectedRoute from '@/app/layout/Auth/ProtectedRoute';

const AdminPage = () => {
    return (
        <ProtectedRoute roles={['admin']}>
            <div>
                <h1>Admin Page</h1>
            </div>
        </ProtectedRoute>
    );
};

export default AdminPage;
