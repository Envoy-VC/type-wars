import { cn } from '@repo/ui/lib/utils';
import { keys } from '~/data';

export const Keyboard = () => {
  return (
    <div className=' flex select-none flex-col gap-1 rounded-b-[4rem] bg-neutral-100 px-1 pt-2 pb-4 dark:bg-[#1c1c1c]'>
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
                    key.className
                  )}
                  key={key.key}
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
