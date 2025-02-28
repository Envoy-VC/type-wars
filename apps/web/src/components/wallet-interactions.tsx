'use client';

import { Button } from '@repo/ui/components/button';
import { useQuery } from '@tanstack/react-query';
import { formatEther } from 'viem';
import { useWallet } from '~/hooks';
import { truncate } from '~/lib/utils';
import { basePublicClient } from '~/lib/viem';

export const WalletInteractions = () => {
  const { wallet, createWallet, fundWallet } = useWallet();

  const { data: balance } = useQuery({
    queryKey: ['wallet-balance', wallet?.address],
    enabled: Boolean(wallet),
    queryFn: async () => {
      if (!wallet) return '0';
      const balance = await basePublicClient.getBalance({
        address: wallet?.address,
        blockTag: 'latest',
      });
      console.log(balance);

      const parsed = formatEther(balance);
      return Number(parsed).toFixed(4);
    },
  });
  return (
    <div className='mx-auto flex'>
      {wallet && (
        <div className='flex flex-row items-center gap-2'>
          <div className='flex flex-row items-center gap-2 rounded-2xl border-2 px-3'>
            <div className=' py-2'>{truncate({ text: wallet.address })}</div>
            <div className='h-fit rounded-lg bg-neutral-200 px-2 py-1 dark:bg-neutral-800'>
              {balance} ETH
            </div>
          </div>
          <Button onClick={fundWallet}>Fund Wallet</Button>
        </div>
      )}
      {!wallet && <Button onClick={createWallet}>Create Wallet</Button>}
    </div>
  );
};
