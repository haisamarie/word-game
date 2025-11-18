import readline from "readline";
import { createHiddenState, updateRevealedState, validateInput, updateFailCount, isWin, isLose } from "./game.js";
import { WORD_LIST, MAX_FAILS, getRandomElement } from "./words.js";


const GameState = {
  word: getRandomElement(WORD_LIST),
  currentState: [],
  remainingFails: MAX_FAILS,
  guessedLetters: []
};

GameState.currentState = createHiddenState(GameState.word);

const consoleInput = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log(GameState.currentState.join(" "));
console.log(`残り失敗可能数: ${GameState.remainingFails}`);

function Main() {
  consoleInput.question("1文字入力してください: ", (input) => {

    if (!validateInput(input)) {
      console.log("アルファベット1文字を入力してください。");
      return Main();
    }

    const letter = input.toLowerCase();

    if (GameState.guessedLetters.includes(letter)) {
      console.log("その文字はすでに入力されています。");
      return Main();
    }

    GameState.currentState = updateRevealedState(GameState.word, GameState.currentState, letter);

    GameState.remainingFails = updateFailCount(GameState.word, letter, GameState.remainingFails);

    GameState.guessedLetters.push(letter);

    // 状態表示（推測済み文字は非表示）
    console.log(GameState.currentState.join(" "));
    console.log(`残り失敗可能数: ${GameState.remainingFails}`);

    if (isWin(GameState.currentState)) {
      console.log("正解です");
      consoleInput.close();
      return;
    }

    if (isLose(GameState.remainingFails)) {
      console.log(`5回間違えてしまったので不正解となります。正解は "${GameState.word}" でした。`);
      consoleInput.close();
      return;
    }

    Main();
  });
}

Main();
