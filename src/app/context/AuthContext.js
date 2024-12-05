// src/app/context/AuthContext.js

'use client';

import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // { role: 'admin' or 'guest' }
    const [loading, setLoading] = useState(true);

    // İlk useEffect: Tarayıcıdan mevcut oturumu yükleme
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    // İkinci useEffect: Oturumun geçerli olup olmadığını kontrol etme
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch('/api/checkAuth', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    setUser(data.user);
                    localStorage.setItem('user', JSON.stringify(data.user));
                } else {
                    setUser(null);
                    localStorage.removeItem('user');
                }
            } catch (error) {
                setUser(null);
                localStorage.removeItem('user');
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    // Üçüncü useEffect: Global fetch'i izleme
    useEffect(() => {
        const originalFetch = window.fetch;

        window.fetch = async (...args) => {
            const response = await originalFetch(...args);

            // Eğer yanıt 401 ise, kullanıcıyı oturumdan çıkar
            if (response.status === 401) {
                setUser(null);
                localStorage.removeItem('user');
            }

            return response;
        };

        // Bileşen unmount olduğunda fetch'i eski haline döndür
        return () => {
            window.fetch = originalFetch;
        };
    }, []);

    const login = async (email, password) => {
        // API ile iletişim kurarak giriş yapın
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
            credentials: 'include',
        });
        const data = await response.json();
        if (!response.ok) {
            if (data.email || data.password) {
                throw data;
            } else {
                throw new Error(data.message ?? 'Bilinmeyen hata');
            }
        }

        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
    };

    const logout = async () => {
        try {
            // API ile iletişim kurarak çıkış yapın
            await fetch('/api/logout', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            setUser(null);
            localStorage.removeItem('user');
        } catch (error) {
            console.error('Çıkış yaparken hata oluştu:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
