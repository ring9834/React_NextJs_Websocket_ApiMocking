// src/middleware.ts
import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest, NextResponse as NextResponseType } from "next/server";

// export default createMiddleware({
//   locales: ["en", "es", "fr"],
//   defaultLocale: "en",
//   localePrefix: "always",
// });

// The middleware function in middleware.ts will be executed automatically by Next.js for incoming requests that match the specified matcher 
// configuration. The middleware must be in src/middleware.ts (or middleware.ts at the project root if not using a src folder).

// Middleware to handle locale detection and redirection
// This middleware checks the request's Accept-Language header and redirects to the appropriate locale path if not already present.
// It uses the Negotiator library to parse the Accept-Language header and match it against supported locales. 
// The match function is used to determine the best matching locale based on the request's languages and the defined locales.
// If the request path does not start with the matched locale, it redirects to the same path with the locale prefixed.
export default function middleware(request: NextRequest): NextResponseType | undefined {
    const headers = { "accept-language": request.headers.get("accept-language") || "en" } as { [key: string]: string };
    const languages: string[] = new Negotiator({ headers }).languages();
    const locales: string[] = ["en", "fr", "es"];
    const defaultLocale: string = "en";
    const locale: string = match(languages, locales, defaultLocale);
    const pathname: string = request.nextUrl.pathname;

    if (!pathname.startsWith(`/${locale}`)) {
        return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
    }
    return NextResponse.next();
}

export const config = {
  // Match all paths except API routes, Next.js internals.
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};

// How it works:
// A request to /en/posts sets locale="en" in params.
// LocaleLayout sets <html lang="en"> and loads messages/en.json.
// NextIntlClientProvider passes locale and messages to PostsPage and PostsList.
// Child components use useTranslations to access translated strings.
