import { WalletInteractions } from '~/components';

const Home = () => {
  return (
    <div className='my-[6dvh] flex h-full w-full flex-col gap-12 px-5'>
      <div className='mx-auto w-fit text-center text-5xl leading-[1.4]'>
        Each Keystroke
        <br />
        in a Flash
      </div>
      <WalletInteractions />
    </div>
  );
};

export default Home;
