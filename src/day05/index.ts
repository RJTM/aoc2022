import run from "aocrunner";
import { arrayPartition, invertMatrix, pluckIndexes } from "../utils/index.js";

const exampleInput = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

const parseInput = (rawInput: string) => {
  const [stacks, instructions] = rawInput
    .split("\n\n")
    .map((group) => group.split("\n"));

  const indexesToPluck = new Array(stacks[0].length)
    .fill(1)
    .map((_, index) => index * 4 + 1);

  stacks.pop();

  const stackMatrix = stacks.map((line) =>
    pluckIndexes(line.split(""), indexesToPluck),
  );

  const filteredStacks = invertMatrix(stackMatrix).map((stack) =>
    stack.filter((crate) => crate >= "A" && crate <= "Z").reverse(),
  );

  const parsedInstructions = instructions.map((instruction) =>
    pluckIndexes(instruction.split(" "), [1, 3, 5]).map(Number),
  );

  return [filteredStacks, parsedInstructions] as const;
};

const part1 = (rawInput: string) => {
  const [stacks, instructions] = parseInput(rawInput);

  for (const instruction of instructions) {
    for (let i = 0; i < instruction[0]; i++) {
      const crate = stacks[instruction[1] - 1].pop()!;
      stacks[instruction[2] - 1].push(crate);
    }
  }

  return stacks.map((stack) => stack.pop()).join("");
};

const part2 = (rawInput: string) => {
  const [stacks, instructions] = parseInput(rawInput);

  for (const instruction of instructions) {
    const crates = stacks[instruction[1] - 1].splice(-instruction[0]);
    stacks[instruction[2] - 1].push(...crates);
  }

  return stacks.map((stack) => stack.pop()).join("");
};

run({
  part1: {
    tests: [
      {
        input: exampleInput,
        expected: "CMZ",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: exampleInput,
        expected: "MCD",
      },
    ],
    solution: part2,
  },
  trimTestInputs: false,
  onlyTests: false,
});
