import { z } from 'zod';
import { env } from '~/env';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

import { http, createPublicClient, createWalletClient, parseEther } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { baseSepolia } from 'viem/chains';

import BigNumber from 'bignumber.js';

const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(),
});

export const fundRouter = createTRPCRouter({
  fund: publicProcedure
    .input(z.object({ address: z.string().min(1) }))
    .mutation(async ({ input }) => {
      const address = input.address as `0x${string}`;
      const pk = env.PRIVATE_KEY;
      const account = privateKeyToAccount(pk as `0x${string}`);
      const res = await publicClient.getBalance({
        address,
        blockTag: 'latest',
      });
      const balance = new BigNumber(res.toString());
      const threshold = new BigNumber(1e15);
      if (balance.isGreaterThanOrEqualTo(threshold)) {
        throw new Error('Already funded');
      }
      const walletClient = createWalletClient({
        account,
        chain: baseSepolia,
        transport: http(),
      });

      const fundRes = await walletClient.sendTransaction({
        to: address,
        value: parseEther('0.001'),
      });

      return fundRes;
    }),
});
