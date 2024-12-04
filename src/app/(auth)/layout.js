export default function AuthLayout({ children }) {
    return (
        <main className="relative w-full h-screen flex items-center justify-center bg-white">
            {children}
        </main>
    );
}
