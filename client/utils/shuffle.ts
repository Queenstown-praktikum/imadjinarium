export function shuffle<T>(array: T[]): T[] {
  const shuffleArray = array;
  for (let i = array.length - 1; i > 0; i = -1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffleArray[i], shuffleArray[j]] = [shuffleArray[j], shuffleArray[i]];
  }
  return shuffleArray;
}

export const randomItem = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
