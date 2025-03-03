import { NextResponse } from 'next/server';

const POST = async () => {
  const response = NextResponse.json({ success: true });

  response.cookies.set('auth-token', '', {
    httpOnly: true,
    expires: new Date(0), // Immediately expires the cookie
    path: '/',
    sameSite: 'strict',
    ...(process.env.NODE_ENV === 'production' ? { secure: true } : {})
  });

  return response;
};

export { POST };
