import { useLocalStorage } from 'usehooks-ts';

import { generatePrivateKey, privateKeyToAddress } from 'viem/accounts';
import { api } from '~/trpc/react';

import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { truncate } from '~/lib/utils';

export const useWallet = () => {
  const queryClient = useQueryClient();
  const [wallet, setWallet] = useLocalStorage<{
    privateKey: `0x${string}`;
    address: `0x${string}`;
  } | null>('wallet', null);

  const fundMutation = api.fund.fund.useMutation();

  const createWallet = () => {
    const privateKey = generatePrivateKey();
    const address = privateKeyToAddress(privateKey);
    setWallet({ privateKey, address });
  };

  const fundWallet = async () => {
    const id = toast.loading('Funding Wallet...');
    try {
      if (!wallet) {
        throw new Error('No wallet found');
      }
      const hash = await fundMutation.mutateAsync({ address: wallet?.address });
      queryClient.invalidateQueries({
        queryKey: ['wallet-balance', wallet.address],
      });
      toast.success(`ETH Drip Successful! ${truncate({ text: hash })}`, { id });
    } catch (error: unknown) {
      console.error(error);
      toast.error((error as Error).message, { id });
    }
  };

  return { wallet, createWallet, fundWallet };
};
