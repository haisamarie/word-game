import { createHiddenState } from "../src/game";

describe("createHiddenState", () => {
 test("同じ文字数の'_'配列を返す", () => {
    expect(createHiddenState("apple")).toEqual(["_", "_", "_", "_", "_"]);
  });
});
