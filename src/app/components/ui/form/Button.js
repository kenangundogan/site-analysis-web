// src/components/ui/Form/Button.js
'use client';

import clsx from 'clsx';

export default function Button({ children, type = 'button', onClick, className, style, variant = 'primary', ...props }) {
    // İsteğe bağlı: variant’a göre stil belirleyebilirsiniz.
    const baseClasses = 'h-14 p-4 text-sm rounded-sm focus:outline-none';
    const variantClasses = {
        primary: 'bg-blue-700 hover:bg-blue-800 text-white',
        secondary: 'bg-gray-200 hover:bg-gray-300 text-black',
        danger: 'bg-red-700 hover:bg-red-600 text-white',
    };

    return (
        <button
            type={type}
            onClick={onClick}
            className={clsx(baseClasses, variantClasses[variant], className)}
            style={style}
            {...props}
        >
            {children}
        </button>
    );
}
