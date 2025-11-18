
export const createHiddenState = (word) => {
  return Array.from(word, () => "_");
}

export const updateRevealedState = (word, currentState, guessChar) => {
  const guess = guessChar.toLowerCase();
  const chars = Array.from(word.toLowerCase());

  return currentState.map((c, i) => (chars[i] === guess ? guess : c));
}
