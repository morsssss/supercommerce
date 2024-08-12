'use client';

import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon, MicrophoneIcon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { ElevenLabsClient } from "elevenlabs";
import { uiClasses } from 'lib/constants';
import { Fragment, useState } from 'react';

export default function CustomizeArea() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <CustomizeButton setIsOpen={setIsOpen}/>
      <AudioCustomization isOpen={isOpen} setIsOpen={setIsOpen}/>
    </>
  );
}

function CustomizeButton({ setIsOpen }) {
  return (
    <button
      aria-label="Customize audio"
      className={clsx(uiClasses.actionButton, ['hover:opacity-90', 'mt-4'])}
      onClick={() => setIsOpen(true)}
    >
      <div className="absolute left-0 ml-4">
        <MicrophoneIcon className="h-5" />
      </div>
      Customize audio
    </button>
  );
}

function CloseButton() {
  return (
    <div className="absolute top-1 right-1 flex h-11 w-11 items-center justify-center text-black transition-colors  dark:text-white">
      <XMarkIcon className="h-6 transition-all ease-in-out hover:scale-110" />
    </div>
  );
}

function AudioCustomization({ isOpen, setIsOpen }) {
  const [isAudioGenerated, setIsAudioGenerated] = useState(false);
  const [audioBlobSrc, setAudioBlobSrc] = useState('');

  const elevenLabsKey = 'sk_8dfc0e638da8ac15fe5a7ea39335a9dd0999e86195a4f495'; // don't know a logical way to make the env var available client-side.

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    const val = e.target as HTMLFormElement;
    const input = val.customizeText as HTMLInputElement;

    if (!input.value) {
      return false; // ideally this will never happen, heh heh. We should handle this case though.
    }

    const text = input.value.trim();
    const audioBlob = await tts(text);

    if (audioBlob) {
      setAudioBlobSrc(URL.createObjectURL(audioBlob));
      setIsAudioGenerated(true);
    }
  }

  // Send text to the ElevenLabs API and return audio
  async function tts(text: string) {
    const chunks: Buffer[] = [];

    const client = new ElevenLabsClient({
      apiKey: elevenLabsKey
    });

    const audioStream = await client.generate({
      voice: "Rachel",
      model_id: "eleven_turbo_v2",
      text
    });

    for await (const chunk of audioStream) {
      chunks.push(chunk);
    }

    return new Blob(chunks, { type : 'audio/wav' });
  }

 return (
  <Transition show={isOpen}>
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)} className="z-50"
    >
      <Transition.Child
        as={Fragment}
        enter="transition-all ease-in-out duration-300"
        enterFrom="opacity-0 backdrop-blur-none"
        enterTo="opacity-100 backdrop-blur-[.5px]"
        leave="transition-all ease-in-out duration-200"
        leaveFrom="opacity-100 backdrop-blur-[.5px]"
        leaveTo="opacity-0 backdrop-blur-none"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      </Transition.Child>
      <Transition.Child
        as={Fragment}
        enter="transition-all ease-in-out duration-300"
        enterFrom="translate-y-full"
        enterTo="translate-y-0"
        leave="transition-all ease-in-out duration-200"
        leaveFrom="translate-y-0"
        leaveTo="translate-y-full"
      >
        <Dialog.Panel className="fixed flex flex-col items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-[600px] border-neutral-200 bg-gray-300 p-6 border dark:border-neutral-500 dark:bg-gray-700">
          <Dialog.Title>You can customize this item with your own audio.</Dialog.Title>
          <button aria-label="Close dialog" onClick={() => setIsOpen(false)}>
            <CloseButton />
          </button>
          <form
            className="flex flex-col items-center justify-center mt-5 mb-10 py-4 px-6 border dark:border-neutral-500 w-full"
            onSubmit={onSubmit}
          >
            <p className="mt-2 mb-6 text-sm leading-tight dark:text-white/[70%]">
              Enter some text and click the button to generate audio.
            </p>
            <textarea
              name="customizeText"
              placeholder="Happy birthday to you"
              required
              className="text-md w-full rounded-lg border border-gray-600 bg-white px-4 py-2 text-black placeholder:text-neutral-500 md:text-sm dark:border-gray-400 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
            />
            <button
              aria-label="Generate audio"
              className={clsx(uiClasses.actionButton, ['hover:opacity-90', 'mt-4', 'max-w-80'])}
            >
              <div className="absolute left-0 ml-4">
                <MicrophoneIcon className="h-5" />
              </div>
              Generate audio
            </button>
            <Transition show={isAudioGenerated}
              enter="transition-opacity duration-250"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-250"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <audio controls src={audioBlobSrc}></audio>
            </Transition>
          </form>
          <button 
            disabled={!isAudioGenerated}
            className={isAudioGenerated ? 
              clsx(uiClasses.actionButton, 'max-w-96') : 
              clsx(uiClasses.actionButton, uiClasses.disabledButtonClasses, 'max-w-96')
            }
            aria-label="Accept customization"
            onClick={() => setIsOpen(false)} // we should also be saving the audio and text, etc
          >
            <div className="absolute left-0 ml-4">
              <CheckIcon className="h-5" />
            </div>
            Accept customization
          </button>
        </Dialog.Panel>
      </Transition.Child>
    </Dialog>
  </Transition>
 );
}