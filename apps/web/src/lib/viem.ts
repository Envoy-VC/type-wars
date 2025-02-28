import { http, createPublicClient } from 'viem';
import { baseSepolia } from 'viem/chains';
import { env } from '~/env';

export const basePublicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(env.NEXT_PUBLIC_RPC_URL),
});

export const baseConfig = {
  chain: baseSepolia,
  transport: http(env.NEXT_PUBLIC_RPC_URL),
};
