import run from "aocrunner";
import { arrayPartition } from "../utils/index.js";

const exampleInput = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

const parseInput = (rawInput: string) => rawInput.split("\n");

const part1 = (rawInput: string) => {
  const rucksacks = parseInput(rawInput);

  return rucksacks
    .map((rucksack) => [
      rucksack.slice(0, rucksack.length / 2).split(""),
      rucksack.slice(rucksack.length / 2).split(""),
    ])
    .map(
      ([compartmentOne, compartmentTwo]) =>
        compartmentOne.find((item) => compartmentTwo.includes(item))!,
    )
    .map((rucksackItem) =>
      rucksackItem >= "a" && rucksackItem <= "z"
        ? rucksackItem.charCodeAt(0) - 96
        : rucksackItem.charCodeAt(0) - 38,
    )
    .reduce((acc, priority) => acc + priority);
};

const part2 = (rawInput: string) => {
  const rucksacks = parseInput(rawInput);

  return arrayPartition(rucksacks, 3)
    .map(
      (group) =>
        group[0]
          .split("")
          .find(
            (item) =>
              group[1].split("").includes(item) &&
              group[2].split("").includes(item),
          )!,
    )
    .map((rucksackItem) =>
      rucksackItem >= "a" && rucksackItem <= "z"
        ? rucksackItem.charCodeAt(0) - 96
        : rucksackItem.charCodeAt(0) - 38,
    )
    .reduce((acc, priority) => acc + priority);
};

run({
  part1: {
    tests: [
      {
        input: exampleInput,
        expected: 157,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: exampleInput,
        expected: 70,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
