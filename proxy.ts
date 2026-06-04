import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/lib/session';

const protectedRoutes = [
  '/dashboard',
  '/pensions',
  '/mortgages',
  '/pillar3',
  '/investing',
  '/child-funds',
  '/roadmap',
  '/profile',
];

const publicRoutes = ['/', '/login', '/register'];

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isProtected = protectedRoutes.some(
    (r) => path === r || path.startsWith(r + '/')
  );
  const isPublic = publicRoutes.some((r) => path === r);

  const token = req.cookies.get('session')?.value;
  const session = await decrypt(token);

  if (isProtected && !session?.userId) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  if (isPublic && session?.userId && path !== '/') {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.(?:png|jpg|svg|ico)$).*)'],
};
