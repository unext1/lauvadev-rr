import { createCookieSessionStorage } from 'react-router';
import { env } from './env.server';

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '_session',
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secrets: [env.SESSION_SECRET],
    secure: env.NODE_ENV === 'production'
  }
});

export const { getSession, commitSession, destroySession } = sessionStorage;
