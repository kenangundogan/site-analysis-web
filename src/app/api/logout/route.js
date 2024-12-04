// src/app/api/logout/route.js

import { NextResponse } from 'next/server';

export async function GET() {
    const isProduction = process.env.NODE_ENV === 'production';

    const response = NextResponse.json({ message: 'Çıkış yapıldı' }, { status: 200 });

    response.cookies.set('token', '', {
        httpOnly: true,
        sameSite: 'strict',
        path: '/',
        maxAge: 0,
        secure: isProduction,
    });

    return response;
}
