import { http, createPublicClient } from 'viem';
import { baseSepolia } from 'viem/chains';

export const basePublicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(),
});

export const baseFlashBlockPublicClient = createPublicClient({
  chain: baseSepolia,
  transport: http('https://sepolia-preconf.base.org/'),
});
