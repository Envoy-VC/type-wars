import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/select';

import { useTypingMonitor } from '~/hooks';

export const SelectRPC = () => {
  const { blockType, setBlockType } = useTypingMonitor();

  return (
    <div className='my-5 flex flex-row items-center gap-2'>
      <div className='text-base'>Block Type</div>
      <Select
        onValueChange={(value) =>
          setBlockType(value as 'default' | 'flashblock')
        }
        value={blockType}
      >
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='Block Type' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='default'>Default</SelectItem>
          <SelectItem value='flashblock'>Flashblock</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
