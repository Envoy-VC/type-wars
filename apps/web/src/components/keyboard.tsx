'use client';

import { cn } from '@repo/ui/lib/utils';
import { keys } from '~/data';
import { useWallet } from '~/hooks';
import { useTypingMonitor } from '~/hooks/use-typing-monitor';

export const Keyboard = () => {
  const {
    addCharacter,
    removeLastCharacter,
    disabled,
    enteredCharacters,
    setStartAt,
    setEndAt,
    setDisabled,
  } = useTypingMonitor();
  const { runTransaction } = useWallet();
  return (
    <div className=' flex select-none flex-col gap-1 bg-neutral-100 px-1 pt-2 pb-4 sm:rounded-b-[4rem] dark:bg-[#1c1c1c]'>
      {keys.map((row, index) => {
        return (
          <div
            className='flex flex-row items-center justify-center gap-1'
            key={`row-${String(index)}`}
          >
            {row.map((key) => {
              return (
                <button
                  type='button'
                  className={cn(
                    'm-0 flex cursor-pointer items-center justify-center rounded-lg bg-[#e0e0e0] p-0 text-black hover:bg-neutral-200 dark:bg-[#333333] dark:text-white dark:hover:bg-[#333333]',
                    'disabled:bg-[#c9c9c9] disabled:text-neutral-600',
                    'disabled:dark:bg-[#2a2a2a] disabled:dark:text-neutral-400',
                    key.className
                  )}
                  key={key.key}
                  disabled={disabled}
                  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: safe
                  onClick={async () => {
                    if (enteredCharacters.length === 0) {
                      setStartAt(new Date());
                    }
                    setDisabled(true);
                    if (key.key === 'backspace') {
                      removeLastCharacter();
                    } else if (
                      key.key === 'shift' ||
                      key.key === 'symbols' ||
                      key.key === 'dot'
                    ) {
                      // Do nothing
                    } else if (key.key === 'submit') {
                      setEndAt(new Date());
                    } else {
                      addCharacter(key.value);
                    }

                    try {
                      await runTransaction();
                    } catch (error) {
                      // do nothing
                    }
                    setDisabled(false);
                  }}
                >
                  {key.value}
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
