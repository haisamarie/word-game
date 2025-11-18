
export const createHiddenState = (word) => {
  return Array.from(word, () => "_");
}

export const updateRevealedState = (word, currentState, guessChar) => {
  const guess = guessChar.toLowerCase();
  const chars = Array.from(word.toLowerCase());

  return currentState.map((c, i) => (chars[i] === guess ? guess : c));
}

export const validateInput = (input) => {
  return /^[a-zA-Z]$/.test(input);
}

export const updateFailCount = (word, guess, remaining) =>
  word.toLowerCase().includes(guess.toLowerCase()) ? remaining : remaining - 1;

export const isWin = (currentState) => currentState.every(char => char !== "_");

export const isLose = (remainingFails) => remainingFails <= 0;
