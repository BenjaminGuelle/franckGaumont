import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {

  console.log('middleware run')
  const authCookie = req.cookies.get('session');

  if (!authCookie) {
    const url = req.nextUrl.clone();
    url.pathname = '/connexion';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/administration'],
}