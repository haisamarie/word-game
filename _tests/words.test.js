import { WORD_LIST } from "../src/words";

test("単語リストは10語以上", () => {
  expect(WORD_LIST.length).toBeGreaterThanOrEqual(10);
});

test("単語リストに文字数のバリエーションがある", () => {
  const lengths = WORD_LIST.map((word) => word.length);
  const uniqueLengths = new Set(lengths);

  // 文字数の種類が2種類以上あることを確認
  expect(uniqueLengths.size).toBeGreaterThan(1);
});
