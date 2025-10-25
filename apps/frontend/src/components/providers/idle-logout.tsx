"use client";

import { useEffect, useRef } from 'react';
import { signOut, useSession } from 'next-auth/react';

// Idle logout after 15 minutes of inactivity across tabs
// - Tracks last activity in localStorage
// - Syncs between tabs via `storage` events
// - Signs out and redirects to /login

const IDLE_LIMIT_MS = 15 * 60 * 1000; // 15 minutes
const LAST_ACTIVITY_KEY = 'tri:lastActivity';
const FORCE_SIGNOUT_KEY = 'tri:forceSignout';

export function IdleLogout() {
  const { status } = useSession();
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const now = Date.now();
    try {
      localStorage.setItem(LAST_ACTIVITY_KEY, String(now));
    } catch {}

    const updateActivity = () => {
      try {
        localStorage.setItem(LAST_ACTIVITY_KEY, String(Date.now()));
      } catch {}
    };

    const onStorage = (e: StorageEvent) => {
      if (e.key === FORCE_SIGNOUT_KEY && e.newValue === '1') {
        void signOut({ callbackUrl: '/login' });
      }
    };

    const checkIdle = () => {
      try {
        const last = Number(localStorage.getItem(LAST_ACTIVITY_KEY) || '0');
        if (status === 'authenticated' && last && Date.now() - last > IDLE_LIMIT_MS) {
          localStorage.setItem(FORCE_SIGNOUT_KEY, '1');
          localStorage.removeItem(FORCE_SIGNOUT_KEY);
          void signOut({ callbackUrl: '/login' });
        }
      } catch {}
    };

    // Listeners de actividad
    const activityEvents: string[] = [
      'mousemove',
      'keydown',
      'click',
      'scroll',
      'touchstart',
      'visibilitychange',
    ];
    activityEvents.forEach((ev) => window.addEventListener(ev as any, updateActivity, { passive: true }));
    window.addEventListener('storage', onStorage);

    // Intervalo de chequeo
    timerRef.current = window.setInterval(checkIdle, 5000);

    return () => {
      activityEvents.forEach((ev) => window.removeEventListener(ev, updateActivity));
      window.removeEventListener('storage', onStorage);
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [status]);

  return null;
}
