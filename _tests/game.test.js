import { createHiddenState,updateRevealedState, validateInput ,isWin,isLose } from "../src/game";

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
    const word = "apple";
    const currentState = ["_", "_", "_", "_", "_"];
    const guessChar = "a";

    const result = updateRevealedState(word, currentState, guessChar);
    expect(result).toEqual(["a", "_", "_", "_", "_"]);
  });

});

describe("validateInput", () => {
  test("1文字のアルファベットなら true を返す", () => {
    expect(validateInput("a")).toBe(true);
    expect(validateInput("Z")).toBe(true);
  });

  test("複数文字の場合は false を返す", () => {
    expect(validateInput("ab")).toBe(false);
  });

  test("数字や記号の場合は false を返す", () => {
    expect(validateInput("1")).toBe(false);
    expect(validateInput("@")).toBe(false);
  });

  test("空文字の場合は false を返す", () => {
    expect(validateInput("")).toBe(false);
  });
});


describe("isWin", () => {
  test("全てのアンダースコアが開かれていれば true を返す", () => {
    const currentState = ["a", "p", "p", "l", "e"];
    expect(isWin(currentState)).toBe(true);
  });

  test("まだアンダースコアが残っていれば false を返す", () => {
    const currentState = ["a", "p", "_", "l", "e"];
    expect(isWin(currentState)).toBe(false);
  });

});

describe("isLose", () => {
  test("残り失敗回数が0なら true を返す", () => {
    expect(isLose(0)).toBe(true);
  });

  test("残り失敗回数が1以上なら false を返す", () => {
    expect(isLose(1)).toBe(false);
    expect(isLose(5)).toBe(false);
  });
});
