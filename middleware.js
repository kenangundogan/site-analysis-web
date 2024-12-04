// middleware.js
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;

export function middleware(request) {
    const { pathname } = request.nextUrl;
    const publicPaths = ['/login', '/register', '/api/login', '/api/logout', '/api/register'];

    const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

    if (isPublicPath) {
        return NextResponse.next();
    }

    const token = request.cookies.get('token')?.value;

    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
        jwt.verify(token, SECRET_KEY);

        return NextResponse.next();
    } catch (error) {
        console.error('JWT Doğrulama Hatası:', error);

        return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: ['/admin/:path*', '/guest/:path*'],
};
