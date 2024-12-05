// src/components/ui/Form/Input.js
'use client';

import clsx from 'clsx';

export default function Input({
    type = 'text',
    name,
    value,
    onChange,
    placeholder,
    className,
    style,
    label,
    error,
    ...props
}) {
    return (

        <div className={clsx('mb-4', className)} style={style}>
            {label && (
                <label
                    htmlFor={name}
                    className="block text-gray-700 text-xs font-bold mb-2"
                >
                    {label}
                </label>
            )}
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="appearance-none rounded-sm w-full h-14 p-4 border text-sm text-gray-700 focus:outline-none"
                {...props}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
}
