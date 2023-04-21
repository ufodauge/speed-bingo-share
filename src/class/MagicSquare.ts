import Random from "./Random";
import Task from "./Task";

export default class MagicSquare {
  private seed: number;
  private size: number;
  private magicSquare: number[];
  private checkList: { [key: string]: number };

  constructor(size: number, seed: number) {
    this.seed = seed;
    this.size = size;

    this.checkList = { bltr: 0b0, tlbr: 0b0 };
    for (let i = 0; i < size; i++) {
      this.checkList[`col${i + 1}`] = 0b0;
      this.checkList[`row${i + 1}`] = 0b0;
    }

    if (size % 2 === 0) {
      Error("Currently the board size must be odd number.");
    }

    this.magicSquare = [...Array<number>(this.size * this.size)];
    this.generate();
  }

  generate = () => {
    if (this.size === 2) {
      console.warn("There's no magic square of size 2.");
      this.generateOddMS();
    } else if (this.size % 2 === 0) {
      console.warn(
        "The board size is currently recommended to be [3, 5, 7]."
      );
      this.generateOddMS();
    } else if (this.size === 3) {
      this.generate3x3MS();
    } else {
      // console.log("The board size is currently recommended to be [3, 5, 7].");
      this.generateOddMS();
    }
  };

  generate3x3MS = () => {
    // this is the only way to build 3x3 magic square.
    this.magicSquare = [
      7, 0, 5,
      2, 4, 6,
      3, 8, 1
    ];

    this.assertMagicSquare();
  };

  generateOddMS = () => {
    // init
    const random = new Random(this.seed);

    const shuffleArray = (array: Array<any>) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = random.nextInt(0, i);
        [array[i], array[j]] = [array[j], array[i]];
      }
    };

    const muls = [...Array<number>(this.size)].map((_, i) => this.size * i);
    const mods = [...Array<number>(this.size)].map((_, i) => i);

    shuffleArray(muls);
    shuffleArray(mods);

    this.magicSquare.forEach((_, i) => {
      const x = Math.floor(i / this.size);
      const y = i % this.size;

      this.magicSquare[i] =
        muls[(x * 3 + y) % this.size] + mods[(y * 3 + x) % this.size];
    });

    this.assertMagicSquare();
  };

  generateEvenMS = () => {};

  assignTask = (tasks: Task[], pos: number): Task =>
    tasks.find((task) => this.checkFilter(task.filter, pos)) ||
    new Task(pos, this.getDifficulty(pos), "Error!", 0);

  getRowsByPosition = (pos: number): string[] => {
    const rows: string[] = [
      `row${Math.floor(pos / this.size)}`,
      `col${pos % this.size}`,
    ];

    if (pos % (this.size + 1) === 0) {
      rows.push("tlbr");
    }

    if (
      pos % (this.size - 1) === 0 &&
      ![0, this.size * this.size].includes(pos)
    ) {
      rows.push("bltr");
    }

    return rows;
  };

  checkFilter = (filter: number, pos: number): boolean =>
    this.rowsCheck(filter, this.getRowsByPosition(pos));

  rowsCheck = (filter: number, rows: string[]): boolean =>
    rows.every((v) => (this.checkList[v] & filter) === 0b0);

  updateFilter = (filter: number, pos: number) =>
    this.rowsUpdate(filter, this.getRowsByPosition(pos));

  rowsUpdate = (filter: number, rows: string[]) =>
    rows.forEach((v) => (this.checkList[v] &= filter));

  getDifficulty = (pos: number): number => this.magicSquare[pos] + 1;

  assertMagicSquare = () => {
    const _magicSquare2d: number[][] = [];

    this.magicSquare.forEach((_, i) => {
      const x = i % this.size;
      const y = Math.floor(i / this.size);
      _magicSquare2d[y] = _magicSquare2d[y] || [];
      _magicSquare2d[y][x] = this.magicSquare[i];
    });

    // console.log(_magicSquare2d);

    const target = ((this.size * this.size + 1) * this.size) / 2 - this.size;

    let bltr = 0,
      tlbr = 0;
    for (let i = 0; i < _magicSquare2d.length; i++) {
      let a = 0,
        b = 0;
      for (let j = 0; j < _magicSquare2d[i].length; j++) {
        a += _magicSquare2d[i][j];
        b += _magicSquare2d[j][i];
      }
      tlbr += _magicSquare2d[i][i];
      bltr += _magicSquare2d[_magicSquare2d.length - i - 1][i];

      console.assert(
        a === target,
        `row${i}, expect ${target}, but the sum of the row ${a}`
      );
      console.assert(
        b === target,
        `col${i}, expect ${target}, but the sum of the row ${b}`
      );
    }

    console.assert(tlbr === target);
    console.assert(bltr === target);
  };
}
