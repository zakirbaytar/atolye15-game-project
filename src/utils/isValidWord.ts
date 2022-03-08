interface IsValidWordArguments {
  word: string;
  words: string[];
  wordHistory: string[];
}

const isValidWord = ({ words, wordHistory, word }: IsValidWordArguments): boolean => {
  if (wordHistory.includes(word)) return false;
  if (!words.includes(word)) return false;

  const lastWord = wordHistory.at(-1);
  if (!lastWord) return true;

  return lastWord.at(-1) === word[0];
};

export default isValidWord;
