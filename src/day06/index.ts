import run from "aocrunner";

const exampleInput = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`;

const parseInput = (rawInput: string) => rawInput.split("");

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input.findIndex((char, index) =>
    index < 3 ? false : new Set(input.slice(index - 4, index)).size === 4,
  );
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input.findIndex((char, index) =>
    index < 13 ? false : new Set(input.slice(index - 14, index)).size === 14,
  );
};

run({
  part1: {
    tests: [
      {
        input: exampleInput,
        expected: 7,
      },
      {
        input: "bvwbjplbgvbhsrlpgdmjqwftvncz",
        expected: 5,
      },
      {
        input: "nppdvjthqldpwncqszvftbrmjlhg",
        expected: 6,
      },
      {
        input: "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg",
        expected: 10,
      },
      {
        input: "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw",
        expected: 11,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: exampleInput,
        expected: 19,
      },
      {
        input: "bvwbjplbgvbhsrlpgdmjqwftvncz",
        expected: 23,
      },
      {
        input: "nppdvjthqldpwncqszvftbrmjlhg",
        expected: 23,
      },
      {
        input: "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg",
        expected: 29,
      },
      {
        input: "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw",
        expected: 26,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
