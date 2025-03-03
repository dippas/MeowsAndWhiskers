import { NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken';
import CryptoJS from 'crypto-js';

const validUsername = process.env.ADMIN_USERNAME;
const validPassword = process.env.ADMIN_PASSWORD;
const authSecret = process.env.AUTH_SECRET;

const validPasswordHash = CryptoJS.SHA256(validPassword).toString();

const POST = async (request: Request) => {
  try {
    const { username, hashedPassword } = await request.json();

    if (username !== validUsername || hashedPassword !== validPasswordHash) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = sign({ username }, authSecret, { expiresIn: '1d' });

    const response = NextResponse.json({ success: true });
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      path: '/',
      sameSite: 'strict',
      ...(process.env.NODE_ENV === 'production' ? { secure: true } : {})
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
};

export { POST };
