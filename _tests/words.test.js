import { WORD_LIST,chooseRandomWord } from "../src/words";

test("単語リストは10語以上", () => {
  expect(WORD_LIST.length).toBeGreaterThanOrEqual(10);
});

test("単語リストに文字数のバリエーションがある", () => {
  const lengths = WORD_LIST.map((word) => word.length);
  const uniqueLengths = new Set(lengths);

  // 文字数の種類が2種類以上あることを確認
  expect(uniqueLengths.size).toBeGreaterThan(1);
});


describe("chooseRandomWord", () => {
  test("候補単語リストからランダムに返す１つ単語を返す", () => {
    const result = chooseRandomWord(WORD_LIST);
    expect(WORD_LIST).toContain(result);
  });
});
