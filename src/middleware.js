import { NextResponse } from "next/server";

let locales = ['en', 'ar'];

// Get the preferred locale from the request headers or cookies
function getLocale(request) {
  const cookieLocale = request.cookies.get('preferredLang')?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  const acceptLanguage = request.headers.get('accept-language') || '';
  const languages = acceptLanguage.split(',').map(lang => lang.split(';')[0].trim());

  for (const lang of languages) {
    if (locales.includes(lang)) {
      return lang;
    }
  }

  return locales[0]; // Default to 'en' if no match
}

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Check if it's a request for a file, like favicon.ico or any other static assets
  if (pathname.includes('.') || pathname === '/favicon.ico') {
    return NextResponse.next(); // Skip processing for such files
  }

  // Extract the first part of the URL to check for the locale
  const currentLocale = pathname.split('/')[1];
  const pathnameHasLocale = locales.includes(currentLocale);

  if (pathnameHasLocale) {
    return NextResponse.next(); // If locale is in the URL, proceed as normal
  }

  // If no locale in the URL, redirect to the preferred locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip internal paths (_next, static files, etc.)
    '/((?!_next|static|favicon.ico|favicon.png|robots.txt).*)',
  ],
};
