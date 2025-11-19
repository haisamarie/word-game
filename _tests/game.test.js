import { createHiddenState,updateRevealedState, validateInput ,updateFailCount,isCorrect,isIncorrect } from "../src/game";

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


describe("updateFailCount", () => {

  test("単語内に推測文字が含まれている場合は失敗回数を減らさない", () => {
    const result = updateFailCount("apple", "a", 5);
    expect(result).toBe(5);
  });

  test("単語内に推測文字が含まれていない場合は失敗回数を1減らす", () => {
    const result = updateFailCount("apple", "x", 5);
    expect(result).toBe(4);
  });

  test("大文字小文字の差を無視して判定する", () => {
    const result = updateFailCount("Apple", "A", 5);
    expect(result).toBe(5);
  });

  test("残り回数が減るのは1回のみであること", () => {
    const result = updateFailCount("apple", "z", 1);
    expect(result).toBe(0);
  });

});

describe("isCorrect", () => {
  test("全てのアンダースコアが開かれていれば true を返す", () => {
    const currentState = ["a", "p", "p", "l", "e"];
    expect(isCorrect(currentState)).toBe(true);
  });

  test("まだアンダースコアが残っていれば false を返す", () => {
    const currentState = ["a", "p", "_", "l", "e"];
    expect(isCorrect(currentState)).toBe(false);
  });

});

describe("isIncorrect", () => {
  test("残り失敗回数が0なら true を返す", () => {
    expect(isIncorrect(0)).toBe(true);
  });

  test("残り失敗回数が1以上なら false を返す", () => {
    expect(isIncorrect(1)).toBe(false);
    expect(isIncorrect(5)).toBe(false);
  });
});
