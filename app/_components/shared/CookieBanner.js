'use client';

import { useState, useSyncExternalStore, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import styles from './CookieBanner.module.css';

const CONSENT_KEY = 'cookie_consent';

function subscribe(callback) {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

function getConsentSnapshot() {
  const stored = localStorage.getItem(CONSENT_KEY);
  return stored; // returns 'accepted', 'declined', or null
}

function getServerSnapshot() {
  return null;
}

export function useCookieConsent() {
  const consent = useSyncExternalStore(subscribe, getConsentSnapshot, getServerSnapshot);
  return consent === 'accepted' ? true : consent === 'declined' ? false : null;
}

export default function CookieBanner() {
  const t = useTranslations('cookies');
  const consentStatus = useSyncExternalStore(subscribe, getConsentSnapshot, getServerSnapshot);
  const [dismissed, setDismissed] = useState(false);

  const handleAccept = useCallback(() => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setDismissed(true);
    window.location.reload();
  }, []);

  const handleDecline = useCallback(() => {
    localStorage.setItem(CONSENT_KEY, 'declined');
    setDismissed(true);
  }, []);

  // Don't show if already has consent status or was dismissed this session
  if (consentStatus !== null || dismissed) return null;

  return (
    <div className={styles.banner}>
      <div className={styles.content}>
        <p className={styles.text}>
          {t('message')}{' '}
          <Link href="/privatepolicy" className={styles.link}>
            {t('learnMore')}
          </Link>
        </p>
        <div className={styles.actions}>
          <button onClick={handleDecline} className={styles.decline}>
            {t('decline')}
          </button>
          <button onClick={handleAccept} className={styles.accept}>
            {t('accept')}
          </button>
        </div>
      </div>
    </div>
  );
}
