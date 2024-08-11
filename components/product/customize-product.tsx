'use client';

import { MicrophoneIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { uiClasses } from 'lib/constants';

export function CustomizeButton() {
    return (
      <button
        aria-label="Add to cart"
        className={clsx(uiClasses.actionButton, ['hover:opacity-90', 'mt-4'])}
      >
        <div className="absolute left-0 ml-4">
          <MicrophoneIcon className="h-5" />
        </div>
        Customize with audio
      </button>
    );
}