interface GetRandomWordArguments {
  words: string[];
  lastWord: string | null;
}

const getRandomElement = (array: string[]) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

const getRandomWord = ({ words, lastWord }: GetRandomWordArguments) => {
  if (!lastWord) {
    return getRandomElement(words);
  }

  return getRandomElement(words.filter((word) => word[0] === lastWord.at(-1)));
};

export default getRandomWord;
