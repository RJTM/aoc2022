import run from "aocrunner";
import { mapSet } from "../utils/index.js";

const exampleInput = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

const parseInput = (rawInput: string) => {
  const directoryStack: string[] = [];
  const directorySize = new Map<string, number>();

  const instructions = rawInput
    .split("\n")
    .filter((instruction) => instruction !== "$ ls");

  for (const instruction of instructions) {
    const instructionPieces = instruction.split(" ");

    if (instructionPieces.length === 3) {
      if (instructionPieces[2] === "..") {
        directoryStack.pop();
        continue;
      }

      directoryStack.push(instructionPieces[2]);
      continue;
    }

    if (instructionPieces[0] === "dir") continue;

    const fileSize = parseInt(instructionPieces[0]);
    directoryStack.forEach((stackedDir, index) => {
      mapSet(
        directorySize,
        directoryStack.slice(0, index + 1).join("/"),
        (oldSize) => (oldSize == null ? fileSize : oldSize + fileSize),
      );
    });
  }

  return { directorySize };
};

const part1 = (rawInput: string) => {
  const { directorySize } = parseInput(rawInput);

  return [...directorySize.values()]
    .filter((size) => size <= 100000)
    .reduce((prev, size) => prev + size, 0);
};

const part2 = (rawInput: string) => {
  const { directorySize } = parseInput(rawInput);

  return [...directorySize.values()]
    .sort((a, b) => a - b)
    .find((size) => 70000000 - (directorySize.get("/")! - size) >= 30000000);
};

run({
  part1: {
    tests: [
      {
        input: exampleInput,
        expected: 95437,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: exampleInput,
        expected: 24933642,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
