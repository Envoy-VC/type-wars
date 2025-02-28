import { create } from 'zustand';
import { sentences } from '~/data';

interface Metrics {
  charAccuracy: number;
  wordAccuracy: number;
  correctWords: number;
  totalTypedWords: number;
  wpm: number;
  totalTime: number;
}

const getRandomInt = (min: number, max: number) => {
  const minValue = Math.ceil(min);
  const maxValue = Math.floor(max);
  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
};

const getRandomSentence = () => {
  const index = getRandomInt(0, sentences.length - 1);
  return sentences[index] as string;
};

interface TypingStore {
  currentSentence: string;
  startAt: Date | null;
  endAt: Date | null;
  enteredCharacters: { character: string; isCorrect: boolean }[];
  disabled: boolean;
  blockType: 'default' | 'flashblock';
  setBlockType: (blockType: 'default' | 'flashblock') => void;
  setStartAt: (startAt: Date) => void;
  setEndAt: (endAt: Date) => void;
  addCharacter: (character: string) => void;
  removeLastCharacter: () => void;
  setDisabled: (disabled: boolean) => void;
  reset: () => void;
  getMetrics: () => Metrics | null;
}

const useTypingStore = create<TypingStore>((set, get) => ({
  currentSentence: getRandomSentence(),
  startAt: null,
  endAt: null,
  enteredCharacters: [],
  disabled: false,
  blockType: 'default',
  setBlockType: (blockType: 'default' | 'flashblock') => {
    set({ blockType });
  },
  setDisabled: (disabled: boolean) => set({ disabled }),
  setStartAt: (startAt: Date) => set({ startAt }),
  setEndAt: (endAt: Date) => set({ endAt }),
  addCharacter: (character: string) => {
    const currentLength = get().enteredCharacters.length;
    const actualNextCharacter = get().currentSentence[currentLength] as string;
    const isCorrect = actualNextCharacter === character;
    set({
      enteredCharacters: [
        ...get().enteredCharacters,
        { character: actualNextCharacter, isCorrect },
      ],
    });
  },
  removeLastCharacter: () =>
    set({ enteredCharacters: get().enteredCharacters.slice(0, -1) }),
  getMetrics: () => {
    const enteredCharacters = get().enteredCharacters;
    const currentSentence = get().currentSentence;
    const startAt = get().startAt;
    const endAt = get().endAt;

    if (!(startAt && endAt)) return null;

    const totalChars = enteredCharacters.length;
    const correctChars = enteredCharacters.filter((ch) => ch.isCorrect).length;
    const charAccuracy = totalChars > 0 ? (correctChars / totalChars) * 100 : 0;

    // --- Word-level ---
    const targetWords = currentSentence.split(' ');
    // Reconstruct the typed text from the characters
    const typedText = enteredCharacters.map((ch) => ch.character).join('');
    // Only consider words that have been started (non-empty strings)
    const typedWords = typedText.split(' ').filter((word) => word.length > 0);

    let wordScoreSum = 0;
    typedWords.forEach((typedWord, index) => {
      const targetWord = targetWords[index] || '';
      if (typedWord === targetWord) {
        wordScoreSum += 1; // Fully correct
      } else {
        // Calculate partial score:
        let correctCount = 0;
        const compareLength = Math.min(typedWord.length, targetWord.length);
        for (let i = 0; i < compareLength; i++) {
          if (typedWord[i] === targetWord[i]) correctCount++;
        }
        // Partial score is fraction of correctly typed characters in the word
        wordScoreSum += correctCount / typedWord.length;
      }
    });
    const wordAccuracy =
      typedWords.length > 0 ? (wordScoreSum / typedWords.length) * 100 : 0;

    // --- Speed Metrics ---
    const timeSeconds = (endAt.getTime() - startAt.getTime()) / 1000;
    const minutes = timeSeconds / 60;
    // Assuming 5 characters per word on average
    const wpm = minutes > 0 ? totalChars / 5 / minutes : 0;

    return {
      charAccuracy, // Percentage accuracy based on keystrokes
      wordAccuracy, // Percentage based on word comparison
      correctWords: typedWords.filter(
        (word, i) => word === (targetWords[i] || '')
      ).length,
      totalTypedWords: typedWords.length,
      wpm,
      totalTime: timeSeconds,
    };
  },
  reset: () => {
    set({
      currentSentence: getRandomSentence(),
      startAt: null,
      endAt: null,
      enteredCharacters: [],
    });
  },
}));

export const useTypingMonitor = () => {
  const store = useTypingStore();

  return { ...store };
};
