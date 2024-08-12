'use client';

import { Transition } from '@headlessui/react';
import { CheckIcon, MicrophoneIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { ElevenLabsClient } from "elevenlabs";
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
  const [audioBlobSrc, setAudioBlobSrc] = useState('');
  const elevenLabsKey = 'sk_8dfc0e638da8ac15fe5a7ea39335a9dd0999e86195a4f495'; // don't know a logical way to make the env var available client-side.

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    const val = e.target as HTMLFormElement;
    const input = val.customizeText as HTMLInputElement;

    if (input.value) {

    } else {
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
      text,
    });

    for await (const chunk of audioStream) {
      chunks.push(chunk);
    }

    return new Blob(chunks, { type : 'audio/wav' });

 /*   await client.textToSpeech.convert("pMsXgVXv3BLzUgSXRplE", {
        optimize_streaming_latency: ElevenLabs.OptimizeStreamingLatency.Zero,
        output_format: ElevenLabs.OutputFormat.Mp32205032,
        text: "It sure does, Jackie\u2026 My mama always said: \u201CIn Carolina, the air's so thick you can wear it!\u201D",
        voice_settings: {
            stability: 0.1,
            similarity_boost: 0.3,
            style: 0.2
        }
    });
  */
  }

 return (
  <div id="soontobeamodal" className="p-4 border dark:border-neutral-500">
    <form
      className="p-4 border dark:border-neutral-500"
      onSubmit={onSubmit}
    >
      <p className="mt-6 mb-6 text-sm leading-tight dark:text-white/[70%]">
        Enter some text and click the button to generate audio.
      </p>
      <input
        type="text"
        name="customizeText"
        placeholder="Happy birthday to you"
        required
        pattern=".+"
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
        <audio controls src={audioBlobSrc}></audio>
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