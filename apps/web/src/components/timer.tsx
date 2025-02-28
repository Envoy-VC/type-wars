import { useState } from 'react';
import { useInterval } from 'usehooks-ts';
import { useTypingMonitor } from '~/hooks/use-typing-monitor';

export const Timer = () => {
  const [value, setValue] = useState<number>(0);
  const { startAt, endAt } = useTypingMonitor();

  const parseMs = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  // Start a timer from start at, update every 0.1 seconds stop at end at if end at is not null
  useInterval(() => {
    if (!startAt) {
      setValue(0);
      return;
    }
    if (startAt && endAt) {
      setValue(endAt.getTime() - startAt.getTime());
      return;
    }
    setValue(Date.now() - startAt.getTime());
    return;
  }, 100);

  return (
    <div className='relative flex flex-row items-center gap-2'>
      <div className='font-semibold text-3xl'>{parseMs(value)}</div>
    </div>
  );
};
