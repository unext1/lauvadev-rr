import type { Route } from './+types/root';

import {
  data,
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from 'react-router';
import { AuthenticityTokenProvider } from 'remix-utils/csrf/react';
import { csrf } from './services/csrf.server';
import { getTheme } from './services/theme.server';

import tailwindStyleSheetUrl from './tailwind.css?url';

export const links: Route.LinksFunction = () => {
  return [{ rel: 'stylesheet', href: tailwindStyleSheetUrl }].filter(Boolean);
};

export async function loader({ request }: Route.LoaderArgs) {
  const [csrfToken, cookieHeader] = await csrf.commitToken(request);

  const colorScheme = await getTheme(request);

  return data({ csrfToken, colorScheme }, { headers: { 'Set-Cookie': cookieHeader || '' } });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { colorScheme, csrfToken } = useLoaderData<typeof loader>();
  return (
    <html lang="en" className="antialiased min-h-screen h-screen" style={{ colorScheme }} data-theme={colorScheme}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Lauva" />
        <link rel="manifest" href="/site.webmanifest" />

        <Meta />
        <Links />
      </head>
      <body className="min-h-screen h-screen flex flex-col">
        <AuthenticityTokenProvider token={csrfToken}>{children}</AuthenticityTokenProvider>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details = error.status === 404 ? 'The requested page could not be found.' : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack ? (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      ) : null}
    </main>
  );
}
