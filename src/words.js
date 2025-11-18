export const WORD_LIST = [
  "apple",
  "computer",
  "river",
  "mountain",
  "flower",
  "building",
  "car",
  "city",
  "phone",
  "music",
  "ocean",
];

export const getRandomElement = (words) => {
  const index = Math.floor(Math.random() * words.length);
  return words[index];
}
