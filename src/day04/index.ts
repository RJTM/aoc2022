import run from "aocrunner";

const exampleInput = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

const parseInput = (rawInput: string) =>
  rawInput
    .split("\n")
    .map((line) => line.split(",").map((pair) => pair.split("-").map(Number)));

type Pair = [number, number];

function fullyContains(pairA: Pair, pairB: Pair): boolean {
  return (
    (pairA[0] <= pairB[0] && pairA[1] >= pairB[1]) ||
    (pairB[0] <= pairA[0] && pairB[1] >= pairA[1])
  );
}

const part1 = (rawInput: string) => {
  const assignments = parseInput(rawInput);

  return assignments.reduce(
    (acc, pairs) =>
      acc + (fullyContains(pairs[0] as Pair, pairs[1] as Pair) ? 1 : 0),
    0,
  );
};

function overlap(pairA: Pair, pairB: Pair): boolean {
  return (
    (pairA[1] >= pairB[0] && pairA[1] <= pairB[1]) ||
    (pairB[1] >= pairA[0] && pairB[1] <= pairA[1])
  );
}

const part2 = (rawInput: string) => {
  const assignments = parseInput(rawInput);

  return assignments.reduce(
    (acc, pairs) => acc + (overlap(pairs[0] as Pair, pairs[1] as Pair) ? 1 : 0),
    0,
  );
};

run({
  part1: {
    tests: [
      {
        input: exampleInput,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: exampleInput,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
