import { AuthProvider } from '@/app/context/AuthContext';
import "@/styles/globals.css";
import LoadingManager from '@/app/layout/LoadingManager';
import FixVH from '@/app/layout/FixVH';

export const metadata = {
    title: "CMS",
    description: "Content Management System",
};

export default function RootLayout({ children }) {
    return (
        <html lang="tr">
            <body>
                <FixVH />
                <AuthProvider>
                    <LoadingManager>
                        {children}
                    </LoadingManager>
                </AuthProvider>
            </body>
        </html >
    );
}
