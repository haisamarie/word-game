import readline from "readline";
import { createHiddenState, updateRevealedState, validateInput, updateFailCount, isCorrect, isIncorrect } from "./game.js";
import { WORD_LIST, MAX_FAILS, getRandomElement } from "./words.js";

const displayGameState = (state) => {
  console.log("\n" + state.currentState.join(" "));
  console.log(`残り失敗可能数: ${state.remainingFails}`);
  console.log(`使用済み文字: ${Array.from(state.guessedLetters).join(", ")}`);
}

const displayGameMessage = (message) => {
  console.log(message);
}

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

function playTurn() {
  displayGameState(GameState);

  consoleInput.question("1文字入力してください: ", (input) => {
    if (!validateInput(input)) {
      console.log("アルファベット1文字を入力してください。");
      return playTurn();
    }

    const letter = input.toLowerCase();

    if (GameState.guessedLetters.has(letter)) {
      console.log("その文字はすでに入力されています。");
      return playTurn();
    }

    GameState.guessedLetters.add(letter);

    GameState.currentState = updateRevealedState(GameState.word, GameState.currentState, letter);
    GameState.remainingFails = updateFailCount(GameState.word, letter, GameState.remainingFails);

    if (isCorrect(GameState.currentState)) {
      displayGameMessage("正解です。");
      consoleInput.close();
      return;
    }

    if (isIncorrect(GameState.remainingFails)) {
      displayGameMessage(`${MAX_FAILS}回間違えてしまったので不正解となります。正解は "${GameState.word}" でした。`);
      consoleInput.close();
      return;
    }

    playTurn();
  });
}

playTurn();
