// src/app/api/login/route.js

import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import clientPromise from '@/app/lib/mongodb';
import { compare } from 'bcryptjs';

const SECRET_KEY = process.env.SECRET_KEY;
const TOKEN_EXPIRES_IN = process.env.TOKEN_EXPIRES_IN || '3600sn';

export async function POST(request) {
    const { email, password } = await request.json();

    try {
        const client = await clientPromise;
        const db = client.db('siteanalysis');
        const usersCollection = db.collection('users');

        const user = await usersCollection.findOne({ email });

        if (!user) {
            return NextResponse.json({ email: 'E-mail adresi hatalı' }, { status: 401 });
        }

        const isPasswordValid = await compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json({ password: 'Şifre hatalı' }, { status: 401 });
        }

        const tokenPayload = {
            id: user._id.toString(),
            role: user.role,
            name: user.name,
        };

        const token = jwt.sign(tokenPayload, SECRET_KEY, { expiresIn: TOKEN_EXPIRES_IN });

        const isProduction = process.env.NODE_ENV === 'production';

        const response = NextResponse.json({ user: tokenPayload }, { status: 200 });

        response.cookies.set('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            path: '/',
            maxAge: Number(TOKEN_EXPIRES_IN),
            secure: isProduction,
        });

        return response;
    } catch (error) {
        console.error('Login API Hatası:', error);
        return NextResponse.json({ message: 'Sunucu hatası' }, { status: 500 });
    }
}
