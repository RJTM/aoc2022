import run from "aocrunner";

const exampleInput = `A Y
B X
C Z`;

const SHAPE_TO_SCORE_MAP = new Map<string, number>()
  .set("X", 1)
  .set("Y", 2)
  .set("Z", 3)
  .set("A", 1)
  .set("B", 2)
  .set("C", 3);

const GAME_SCORE_MATRIX = [
  [3, 0, 6],
  [6, 3, 0],
  [0, 6, 3],
];

const OUTCOME_MATRIX = {
  A: {
    X: "C",
    Y: "A",
    Z: "B",
  },
  B: {
    X: "A",
    Y: "B",
    Z: "C",
  },
  C: {
    X: "B",
    Y: "C",
    Z: "A",
  },
};

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((line) => line.split(" "));

const part1 = (rawInput: string) => {
  const rounds = parseInput(rawInput);

  return rounds.reduce((prev, round) => {
    const myPlay = SHAPE_TO_SCORE_MAP.get(round[1])!;
    const otherPlayersPlay = SHAPE_TO_SCORE_MAP.get(round[0])!;

    return prev + GAME_SCORE_MATRIX[myPlay - 1][otherPlayersPlay - 1] + myPlay;
  }, 0);
};

const part2 = (rawInput: string) => {
  const rounds = parseInput(rawInput);

  return rounds.reduce((prev, round) => {
    const otherPlayersPlay = SHAPE_TO_SCORE_MAP.get(round[0])!;
    const myPlay =
      OUTCOME_MATRIX[round[0] as "A" | "B" | "C"][round[1] as "X" | "Y" | "Z"];
    const myPlayScore = SHAPE_TO_SCORE_MAP.get(myPlay)!;

    return (
      prev +
      GAME_SCORE_MATRIX[myPlayScore - 1][otherPlayersPlay - 1] +
      myPlayScore
    );
  }, 0);
};

run({
  part1: {
    tests: [
      {
        input: exampleInput,
        expected: 15,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: exampleInput,
        expected: 12,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
