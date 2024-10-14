import { NextResponse } from "next/server";

let locales = ['en', 'ar'];

// Get the preferred locale from the request headers or cookies
function getLocale(request) {
  const cookies = request.cookies.get('preferredLang');
  if (cookies && locales.includes(cookies)) {
    return cookies; // Use preferred language from cookie
  }

  const acceptLanguage = request.headers.get('accept-language') || '';
  const languages = acceptLanguage.split(',').map(lang => lang.split(';')[0].trim());

  // Check for a matching locale in the accepted languages
  for (const lang of languages) {
    if (locales.includes(lang)) {
      return lang;
    }
  }

  return locales[0]; // Default to 'en' if no match
}

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Extract the first part of the URL to check for the locale
  const currentLocale = pathname.split('/')[1];
  const pathnameHasLocale = locales.includes(currentLocale);

  if (pathnameHasLocale) {
    // If the URL already contains a locale, do not modify
    return NextResponse.next();
  }

  // If no locale in the URL, redirect to the preferred locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip internal paths (_next, static files, etc.)
    '/((?!_next|static|favicon.ico).*)',
  ],
};
