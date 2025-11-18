import readline from "readline";
import { createHiddenState, updateRevealedState, validateInput, updateFailCount, isWin, isLose } from "./game.js";
import { WORD_LIST, MAX_FAILS, getRandomElement } from "./words.js";

const displayGameState = (state) => {
  console.log(state.currentState.join(" "));
  console.log(`残り失敗可能数: ${state.remainingFails}`);
};

const GameState = {
  word: getRandomElement(WORD_LIST),
  currentState: [],
  remainingFails: MAX_FAILS,
  guessedLetters: new Set()
};

GameState.currentState = createHiddenState(GameState.word);

const consoleInput = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask() {
  displayGameState(GameState);

  consoleInput.question("1文字入力してください: ", (input) => {
    if (!validateInput(input)) {
      console.log("アルファベット1文字を入力してください。");
      return ask();
    }

    const letter = input.toLowerCase();

    if (GameState.guessedLetters.has(letter)) {
      console.log("その文字はすでに入力されています。");
      return ask();
    }

    GameState.guessedLetters.add(letter);

    GameState.currentState = updateRevealedState(GameState.word, GameState.currentState, letter);
    GameState.remainingFails = updateFailCount(GameState.word, letter, GameState.remainingFails);

    if (isWin(GameState.currentState)) {
      console.log("正解です");
      consoleInput.close();
      return;
    }

    if (isLose(GameState.remainingFails)) {
      displayGameMessage(`${MAX_FAILS}回間違えてしまったので不正解です。正解は "${GameState.word}"`);
      consoleInput.close();
      return;
    }

    ask();
  });
}

ask();
