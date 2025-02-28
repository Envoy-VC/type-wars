import { ArrowBigUp, DeleteIcon, DotIcon, MoveRightIcon } from 'lucide-react';

export const sentences = [
  'quick brown fox jumps over lazy',
  'small keys type fast on blockchain',
  'speedy fingers create magic on screen',
  'flash blocks show power of speed',
  'typing game makes blockchain fun fast',
  'keystrokes record blocks in rapid time',
  'every keystroke builds a chain of trust',
  'rapid typing proves blockchain is real',
];

interface Key {
  key: string;
  className: string;
  value: string;
}

const row1 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'] as const;
const row2 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'] as const;
const row3 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'] as const;
const row4 = ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.'] as const;

export const keys = [
  // Row 1
  [
    ...row1.map((k) => ({
      key: k,
      className: 'w-10 h-10 text-lg !bg-transparent',
      value: k,
    })),
  ] as const,
  // Row 2
  [
    ...row2.map((k) => ({ key: k, className: 'w-10 h-13 text-lg', value: k })),
  ] as const,
  // Row 3
  [
    ...row3.map((k) => ({ key: k, className: 'w-10 h-13 text-lg', value: k })),
  ] as const,
  // Row 4
  [
    {
      key: 'shift',
      className: 'w-14 h-13 text-lg',
      value: <ArrowBigUp className='size-6' />,
    },
    ...row4.map((k) => ({ key: k, className: 'w-10 h-13 text-lg', value: k })),
    {
      key: 'backspace',
      className: 'w-14 h-13 text-lg',
      value: <DeleteIcon className='size-6' />,
    },
  ] as const,
  // Row 5
  [
    {
      key: 'symbols',
      className: 'w-14 h-13 text-lg rounded-3xl',
      value: '?/@',
    },
    { key: 'space', className: 'text-xl w-[14rem] h-13', value: '' },
    {
      key: 'dot',
      className: 'w-10 h-13 text-lg',
      value: <DotIcon className='size-6' />,
    },
    {
      key: 'submit',
      className: 'w-16 h-12 text-lg rounded-full',
      value: <MoveRightIcon className='size-6' />,
    },
  ] as const,
] as const;
