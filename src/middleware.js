import { NextResponse } from "next/server";

const locales = ['en', 'ar'];
const DEFAULT_LOCALE = 'en';

function getLocale(request) {
  // 1. Check cookie first (user preference)
  const cookieLocale = request.cookies.get('preferredLang')?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  // 2. Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const languages = acceptLanguage.split(',')
      .map(lang => lang.split(';')[0].trim().substring(0, 2)); // Get first two letters

    for (const lang of languages) {
      if (locales.includes(lang)) {
        return lang;
      }
    }
  }

  // 3. Default locale
  return DEFAULT_LOCALE;
}

export function middleware(request) {
  const { pathname, search } = request.nextUrl;

  // Skip processing for:
  // - Files with extensions (e.g., .jpg, .css)
  // - API routes
  // - Next.js internal paths
  if (
    pathname.includes('.') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/static/')
  ) {
    return NextResponse.next();
  }

  // Check if path already has a valid locale
  const pathLocale = pathname.split('/')[1];
  if (locales.includes(pathLocale)) {
    // Set cookie to remember this preference
    const response = NextResponse.next();
    response.cookies.set('preferredLang', pathLocale, {
      path: '/',
      maxAge: 365 * 24 * 60 * 60, // 1 year
      sameSite: 'strict'
    });
    return response;
  }

  // Get the preferred locale
  const locale = getLocale(request);
  
  // Redirect to the localized URL
  const newUrl = new URL(`/${locale}${pathname}${search}`, request.url);
  
  // Set the cookie for future requests
  const response = NextResponse.redirect(newUrl);
  response.cookies.set('preferredLang', locale, {
    path: '/',
    maxAge: 365 * 24 * 60 * 60, // 1 year
    sameSite: 'strict'
  });
  
  // Also set theme cookie to 'dark' by default if not set
  if (!request.cookies.get('theme')) {
    response.cookies.set('theme', 'dark', {
      path: '/',
      maxAge: 365 * 24 * 60 * 60,
      sameSite: 'strict'
    });
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|static|images|assets).*)',
  ],
};