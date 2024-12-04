'use client';

import { useEffect } from 'react';

export default function FixVH() {
    useEffect(() => {
        const setVH = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        // İlk yüklemede setVH çalışsın
        setVH();

        // Ekran boyutu değişince (örn. cihazı yatay çevirme) tekrar setVH çalıştır
        window.addEventListener('resize', setVH);
        return () => window.removeEventListener('resize', setVH);
    }, []);

    return null;
}
