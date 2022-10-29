export function shuffled<T>(array: readonly T[]): readonly T[] {
  const arrayToShuffle = [...array];
  let currentIndex = arrayToShuffle.length;
  let randomIndex: number;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [arrayToShuffle[currentIndex], arrayToShuffle[randomIndex]] = [
      arrayToShuffle[randomIndex],
      arrayToShuffle[currentIndex],
    ];
  }

  return arrayToShuffle;
}
