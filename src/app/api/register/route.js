// src/app/api/register/route.js

import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';
import { hash } from 'bcryptjs';

export async function POST(request) {
    const { username, password, name, role } = await request.json();

    try {
        const client = await clientPromise;
        const db = client.db('siteanalysis');
        const usersCollection = db.collection('users');

        const existingUser = await usersCollection.findOne({ username });

        if (existingUser) {
            return NextResponse.json({ message: 'Bu kullanıcı adı zaten kullanılıyor' }, { status: 400 });
        }

        const hashedPassword = await hash(password, 10);

        await usersCollection.insertOne({
            username,
            password: hashedPassword,
            name,
            role,
        });

        return NextResponse.json({ message: 'Kullanıcı başarıyla oluşturuldu' }, { status: 201 });
    } catch (error) {
        console.error('Register API Hatası:', error);
        return NextResponse.json({ message: 'Sunucu hatası' }, { status: 500 });
    }
}
