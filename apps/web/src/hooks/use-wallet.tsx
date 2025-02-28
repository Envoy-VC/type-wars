import { useLocalStorage } from 'usehooks-ts';

import {
  generatePrivateKey,
  privateKeyToAccount,
  privateKeyToAddress,
} from 'viem/accounts';

import { api } from '~/trpc/react';

import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { createWalletClient } from 'viem';
import { truncate } from '~/lib/utils';
import { baseConfig, basePublicClient } from '~/lib/viem';
import { useTypingMonitor } from './use-typing-monitor';

export const useWallet = () => {
  const wssUrl = 'wss://sepolia.flashblocks.base.org/ws';
  const socket = new WebSocket(wssUrl);

  const queryClient = useQueryClient();
  const { blockType } = useTypingMonitor();
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

  const runTransaction = async () => {
    if (!wallet) return;
    const account = privateKeyToAccount(wallet?.privateKey as `0x${string}`);

    const walletClient = createWalletClient({ ...baseConfig, account });
    const hash = await walletClient.sendTransaction({
      to: '0x0000000000000000000000000000000000000000',
      value: BigInt(0),
    });

    if (blockType === 'default') {
      await basePublicClient.waitForTransactionReceipt({
        confirmations: 1,
        hash,
      });
    } else {
      socket.onmessage = async (ev: MessageEvent<Blob>) => {
        const text = await ev.data.text();
        const json = JSON.parse(text);
        const receipts = json.metadata.receipts as Record<string, unknown>;
        const receipt = receipts[hash];
        if (receipt) {
          socket.close();
        }
      };
    }
  };

  return { wallet, createWallet, fundWallet, runTransaction };
};
