import { Button } from '@repo/ui/components/button';
import { RotateCcwIcon } from 'lucide-react';
import { useTypingMonitor } from '~/hooks';

export const Metrics = () => {
  const { startAt, endAt, getMetrics, reset } = useTypingMonitor();
  if (!(startAt && endAt)) return null;
  const metrics = getMetrics();
  return (
    <div className='flex w-full flex-col items-center gap-1'>
      <div className='flex flex-row items-center gap-2'>
        <div className='font-bold text-neutral-700 dark:text-neutral-300'>
          Words Per Minute(WPM):
          <span className='ml-2 font-semibold text-black dark:text-white'>
            {metrics?.wpm.toFixed(2) ?? '0'}
          </span>
        </div>
      </div>
      <div className='flex flex-row items-center gap-2'>
        <div className='font-bold text-neutral-700 dark:text-neutral-300'>
          Character Accuracy:
          <span className='ml-2 font-semibold text-black dark:text-white'>
            {metrics?.charAccuracy.toFixed(2) ?? '0'}%
          </span>
        </div>
      </div>
      <div className='flex flex-row items-center gap-2'>
        <div className='font-bold text-neutral-700 dark:text-neutral-300'>
          Word Accuracy:
          <span className='ml-2 font-semibold text-black dark:text-white'>
            {metrics?.wordAccuracy.toFixed(2) ?? '0'}%
          </span>
        </div>
      </div>
      <Button
        className='my-3 flex flex-row items-center gap-2'
        onClick={reset}
      >
        <RotateCcwIcon />
        Restart
      </Button>
    </div>
  );
};
