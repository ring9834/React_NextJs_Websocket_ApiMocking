
// src/app/[locale]/layout.tsx
// This is a dynamic route layout in the Next.js App Router. The [locale] segment indicates a dynamic route parameter, allowing the layout to 
// apply to routes like /en, /fr, /es, etc., where locale is the language code.
// This layout wraps all pages and nested layouts under the /[locale] route (/en/posts, /fr/posts, etc.).

import { NextIntlClientProvider } from 'next-intl';
import { Providers } from "../providers";

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    // NextIntlClientProvider is a component from the next-intl library, used to provide internationalization context to Client Components.
    // messages: any: Translation messages for the current locale (e.g., a JSON object containing key-value pairs for translated strings)
    <html lang={locale}>
      <body>
        <Providers>
          <NextIntlClientProvider locale={locale} messages={require(`@/messages/${locale}.json`)}>
            {children}
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}