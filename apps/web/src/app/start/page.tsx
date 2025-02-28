import { Keyboard, Sentence } from '~/components';

const StartTyping = () => {
  return (
    <div className='flex h-full flex-col justify-between'>
      <Sentence />
      <Keyboard />
    </div>
  );
};

export default StartTyping;
