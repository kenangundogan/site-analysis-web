import Header from '@/app/layout/Header';
export default function PageLayout({ children }) {
    return (
        <main className="relative top-20 w-full min-h-calc bg-white">
            <Header />
            {children}
        </main>
    );
}
