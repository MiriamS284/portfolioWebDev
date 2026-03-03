'use client';

import { useSyncExternalStore } from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';

const CONSENT_KEY = 'cookie_consent';

function subscribe(callback) {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

function getSnapshot() {
  return localStorage.getItem(CONSENT_KEY) === 'accepted';
}

function getServerSnapshot() {
  return false;
}

export default function Analytics() {
  const hasConsent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!hasConsent || !process.env.NEXT_PUBLIC_GA_ID) {
    return null;
  }

  return <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />;
}
