'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

export function WelcomeToast() {
  useEffect(() => {
    // ignore if screen height is too small
    if (window.innerHeight < 650) return;
    if (!document.cookie.includes('welcome-toast=2')) {
      toast('🛍️ Welcome to the Ancient Babies Store!', {
        id: 'welcome-toast',
        duration: 5000,
        onDismiss: () => {
          document.cookie = 'welcome-toast=2; max-age=31536000; path=/';
        },
        description: (
          <>
            To listen to our amazing music,{' '}
            <a
              href="https://ancientbabies.com"
              className="text-blue-600 hover:underline"
              target="_blank"
            >
              visit our website
            </a>
            {' '}immediately.
          </>
        )
      });
    }
  }, []);

  return null;
}
