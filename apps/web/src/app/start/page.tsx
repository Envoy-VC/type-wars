import { Keyboard } from '~/components';

const StartTyping = () => {
  return (
    <div className='flex h-full flex-col justify-between'>
      <div>Sentence</div>
      <Keyboard />
    </div>
  );
};

export default StartTyping;
