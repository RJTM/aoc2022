import run from "aocrunner";

const exampleInput = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

const parseInput = (rawInput: string) =>
  rawInput.split("\n\n").map((elf) => elf.split("\n"));

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return Math.max(
    ...input.map((foods) =>
      foods.reduce((prev, curr) => prev + parseInt(curr), 0),
    ),
  );
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const totalCalories = input.map((foods) =>
    foods.reduce((prev, curr) => prev + parseInt(curr), 0),
  );

  totalCalories.sort((a, b) => b - a);

  return totalCalories.slice(0, 3).reduce((prev, curr) => prev + curr, 0);
};

run({
  part1: {
    tests: [
      {
        input: exampleInput,
        expected: 24000,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: exampleInput,
        expected: 45000,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
