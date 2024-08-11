'use client';

import { Transition } from '@headlessui/react';
import { CheckIcon, MicrophoneIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { uiClasses } from 'lib/constants';
import { useState } from 'react';

export function CustomizeButton() {
  return (
    <button
      aria-label="Customize with audio"
      className={clsx(uiClasses.actionButton, ['hover:opacity-90', 'mt-4'])}
    >
      <div className="absolute left-0 ml-4">
        <MicrophoneIcon className="h-5" />
      </div>
      Customize with audio
    </button>
  );
}

export function CustomizeUI() {
  const [isAudioGenerated, setIsAudioGenerated] = useState(false);

 return (
  <div id="soontobeamodal" className="p-4 border dark:border-neutral-500">
    <form className="p-4 border dark:border-neutral-500">
      <p className="mt-6 mb-6 text-sm leading-tight dark:text-white/[70%]">
        Enter some text and click the button to generate audio.
      </p>
      <input
        type="text"
        name="customizeText"
        placeholder="Happy birthday to you"
        autoComplete="off"
        className="text-md w-full rounded-lg border bg-white px-4 py-2 text-black placeholder:text-neutral-500 md:text-sm dark:border-neutral-500 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
      />
      <button
        aria-label="Generate audio"
        className={clsx(uiClasses.actionButton, ['hover:opacity-90', 'mt-4'])}
      >
        <div className="absolute left-0 ml-4">
          <MicrophoneIcon className="h-5" />
        </div>
        Generate audio
      </button>
      <Transition show={isAudioGenerated}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <audio controls></audio>
      </Transition>
    </form>
    <button 
      disabled={isAudioGenerated}
      className={clsx(uiClasses.actionButton, uiClasses.disabledButtonClasses)}
      aria-label="Accept customization"
    >
      <div className="absolute left-0 ml-4">
        <CheckIcon className="h-5" />
      </div>
      Accept customization
    </button>
  </div>
 );
}