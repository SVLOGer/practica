import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Word {
    id: string;
    original: string;
    translation: string;
}

interface StoreState {
    words: Word[];
    testResults: { correct: number; total: number }[];
    addWord: (word: Word) => void;
    editWord: (id: string, newWord: Partial<Word>) => void;
    deleteWord: (id: string) => void;
    addTestResult: (result: { correct: number; total: number }) => void;
}

export const useStore = create<StoreState>()(
    persist(
        (set) => ({
            words: [],
            testResults: [],
            addWord: (word) => set((state) => ({ words: [...state.words, word] })),
            editWord: (id, newWord) =>
                set((state) => ({
                    words: state.words.map((word) =>
                        word.id === id ? { ...word, ...newWord } : word
                    ),
                })),
            deleteWord: (id) =>
                set((state) => ({ words: state.words.filter((word) => word.id !== id) })),
            addTestResult: (result) =>
                set((state) => ({ testResults: [...state.testResults, result] })),
        }),
        {
            name: 'language-learning-app',
            getStorage: () => localStorage,
        }
    )
);