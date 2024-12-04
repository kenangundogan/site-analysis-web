// src/components/ui/Form/Form.js
'use client';

import clsx from 'clsx'; // opsiyonel: className birleştirme için

export default function Form({ children, onSubmit, className, style, ...props }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit && onSubmit(e);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={clsx('w-full max-w-lg', className)}
            style={style}
            {...props}
        >
            {children}
        </form>
    );
}
