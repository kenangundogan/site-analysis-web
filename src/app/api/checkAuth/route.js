// src/app/api/checkAuth/route.js

import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;

export async function GET(request) {
    // token çerezi var mı kontrol et
    const cookieToken = request.cookies.get('token');
    // cookie yoksa token null olsun
    const token = cookieToken ? cookieToken.value : null;

    console.log('Token in checkAuth:', token); // Hata ayıklama için

    if (!token) {
        // Token yoksa 401 döndür
        return NextResponse.json({ message: 'Token bulunamadı' }, { status: 401 });
    }

    try {
        const user = jwt.verify(token, SECRET_KEY);
        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Geçersiz veya süresi dolmuş token' }, { status: 401 });
    }
}
