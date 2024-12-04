// src/app/api/register/route.js

import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';
import { hash } from 'bcryptjs';

export async function POST(request) {
    const { password, email, username, firstname, lastname, role } = await request.json();

    try {
        const client = await clientPromise;
        const db = client.db('siteanalysis');
        const usersCollection = db.collection('users');

        const existingUser = await usersCollection.findOne({ email });

        if (existingUser) {
            return NextResponse.json({ message: 'Bu kullanıcı zaten mevcut' }, { status: 400 });
        }

        const hashedPassword = await hash(password, 10);

        await usersCollection.insertOne({
            password: hashedPassword,
            email,
            username,
            firstname,
            lastname,
            role,
        });

        return NextResponse.json({ message: 'Kullanıcı başarıyla oluşturuldu' }, { status: 201 });
    } catch (error) {
        console.error('Register API Hatası:', error);
        return NextResponse.json({ message: 'Sunucu hatası' }, { status: 500 });
    }
}
