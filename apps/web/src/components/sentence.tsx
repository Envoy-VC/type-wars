'use client';

import { useTypingMonitor } from '~/hooks/use-typing-monitor';
import { Metrics } from './metrics';
import { SelectRPC } from './selet-rpc';
import { Timer } from './timer';

export const Sentence = () => {
  const { currentSentence, enteredCharacters, disabled } = useTypingMonitor();
  return (
    <div className='my-[4dvh] flex flex-col items-center'>
      <Timer />
      <div className='my-12 w-full px-8'>
        <div className='relative w-full text-4xl'>
          <div className='text-start text-neutral-400 dark:text-[#3b3b3b]'>
            {currentSentence}
          </div>
          <div className='absolute top-0 left-0 text-4xl dark:text-white'>
            {enteredCharacters.map((character, index) => {
              return (
                <span
                  key={`character-${String(index)}`}
                  className={
                    character.isCorrect
                      ? 'text-black dark:text-white'
                      : 'text-red-500'
                  }
                >
                  {character.character}
                </span>
              );
            })}
          </div>
        </div>
      </div>
      <Metrics />
      <SelectRPC />
      <div>{disabled ? 'Waiting for transaction to complete...' : ''}</div>
    </div>
  );
};
