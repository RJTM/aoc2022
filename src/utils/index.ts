/**
 * Root for your util libraries.
 *
 * You can import them in the src/template/index.ts,
 * or in the specific file.
 *
 * Note that this repo uses ES Modules, so you have to explicitly specify
 * .js extension (yes, .js not .ts - even for TypeScript files)
 * for imports that are not imported from node_modules.
 *
 * For example:
 *
 *   correct:
 *
 *     import _ from 'lodash'
 *     import myLib from '../utils/myLib.js'
 *     import { myUtil } from '../utils/index.js'
 *
 *   incorrect:
 *
 *     import _ from 'lodash'
 *     import myLib from '../utils/myLib.ts'
 *     import { myUtil } from '../utils/index.ts'
 *
 *   also incorrect:
 *
 *     import _ from 'lodash'
 *     import myLib from '../utils/myLib'
 *     import { myUtil } from '../utils'
 *
 */
export function arrayPartition<T>(array: T[], partitionSize: number): T[][] {
  return array.length
    ? [array.splice(0, partitionSize)].concat(
        arrayPartition(array, partitionSize),
      )
    : [];
}

export function pluckIndexes<T>(array: T[], indexes: number[]): T[] {
  return indexes.filter((i) => i < array.length).map((i) => array[i]);
}

export function invertMatrix<T>(matrix: T[][]): T[][] {
  const newMatrix: T[][] = new Array(matrix[0].length)
    .fill(undefined)
    .map(() => new Array(matrix.length).fill(undefined));

  for (let i = 0; i < matrix[0].length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      newMatrix[i][j] = matrix[j][i];
    }
  }

  return newMatrix;
}

export function mapSet<KeyType, ValueType>(
  map: Map<KeyType, ValueType>,
  key: KeyType,
  setterFunction: (oldValue: ValueType | undefined) => ValueType,
): Map<KeyType, ValueType> {
  if (!map.has(key)) {
    map.set(key, setterFunction(undefined));
    return map;
  }

  const oldValue = map.get(key);
  map.set(key, setterFunction(oldValue));
  return map;
}
