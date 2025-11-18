import { createHiddenState,updateRevealedState } from "../src/game";

describe("createHiddenState", () => {
 test("同じ文字数の'_'配列を返す", () => {
    expect(createHiddenState("apple")).toEqual(["_", "_", "_", "_", "_"]);
  });
});

describe("updateRevealedState", () => {
  test("一致する文字のみ置き換える", () => {
    const result = updateRevealedState("apple", ["_", "_", "_", "_", "_"], "p");
    expect(result).toEqual(["_", "p", "p", "_", "_"]);
  });

  test("一致しない場合は変化しない", () => {
    const result = updateRevealedState("apple", ["_", "_", "_", "_", "_"], "x");
    expect(result).toEqual(["_", "_", "_", "_", "_"]);
  });

  test("大文字小文字は区別しない", () => {
    const result = updateRevealedState("APPLE", ["_", "_", "_", "_", "_"], "p");
    expect(result).toEqual(["_", "p", "p", "_", "_"]);
  });

  test("単語内の同じ文字は全て置き換わる", () => {
    const word = "banana";
    const currentState = ["_", "_", "_", "_", "_", "_"];
    const guessChar = "a";

    const result = updateRevealedState(word, currentState, guessChar);
    expect(result).toEqual(["_", "a", "_", "a", "_", "a"]);
  });

});
