import { Console } from 'console';
import {
  GAME_FULL_MESSAGE,
  PLAYER_ALREADY_IN_GAME_MESSAGE,
} from '../../lib/InvalidParametersError';
import { createPlayerForTesting } from '../../TestUtils';
import {
  ConnectFourColIndex,
  ConnectFourColor,
  ConnectFourRowIndex,
} from '../../types/CoveyTownSocket';
import ConnectFourGame from './ConnectFourGame';

const logger = new Console(process.stdout, process.stderr);
/**
 * A helper function to apply a pattern of moves to a game.
 * The pattern is a 2-d array of Y, R or _.
 * Y and R indicate that a move should be made by the yellow or red player respectively.
 * _ indicates that no move should be made.
 * The pattern is applied from the bottom left to the top right, going across the rows
 *
 * Note that there are valid game boards that *can not* be created by this function, as it does not
 * search for all possible orderings of applying the moves. It might get stuck in a situation where
 * it can't make a move, because it hasn't made the move that would allow it to make the next move.
 *
 * If it fails, it will print to the console the pattern and the moves that were made, and throw an error.
 *
 * @param game Game to apply the pattern to
 * @param pattern Board pattern to apply
 * @param redID ID of the red player
 * @param yellowID ID of the yellow player
 * @param firstColor The color of the first player to make a move
 */
function createMovesFromPattern(
  game: ConnectFourGame,
  pattern: string[][],
  redID: string,
  yellowID: string,
  firstColor: ConnectFourColor,
) {
  type QueuedMove = { rowIdx: ConnectFourRowIndex; colIdx: ConnectFourColIndex };
  const queues = {
    Yellow: [] as QueuedMove[],
    Red: [] as QueuedMove[],
  };

  // Construct the queues of moves to make from the board pattern
  pattern.forEach((row, rowIdx) => {
    row.forEach((col, colIdx) => {
      if (col === 'Y') {
        queues.Yellow.push({
          rowIdx: rowIdx as ConnectFourRowIndex,
          colIdx: colIdx as ConnectFourColIndex,
        });
      } else if (col === 'R') {
        queues.Red.push({
          rowIdx: rowIdx as ConnectFourRowIndex,
          colIdx: colIdx as ConnectFourColIndex,
        });
      } else if (col !== '_') {
        throw new Error(`Invalid pattern: ${pattern}, expecting 2-d array of Y, R or _`);
      }
    });
  });

  // sort the queue so that the moves are made from the left to the right, then bottom to up
  const queueSorter = (a: QueuedMove, b: QueuedMove) => {
    function cellNumber(move: QueuedMove) {
      return 6 * (5 - move.rowIdx) + move.colIdx;
    }
    return cellNumber(a) - cellNumber(b);
  };
  queues.Yellow.sort(queueSorter);
  queues.Red.sort(queueSorter);

  const colHeights = [5, 5, 5, 5, 5, 5, 5];
  const movesMade: string[][] = [[], [], [], [], [], []];
  // Helper function to make a move
  const makeMove = (color: ConnectFourColor) => {
    // Finds the first move in the queue that can be made and makes it
    const queue = queues[color];
    if (queue.length === 0) return;
    for (const move of queue) {
      if (move.rowIdx === colHeights[move.colIdx]) {
        // we can make this!
        game.applyMove({
          gameID: game.id,
          move: {
            gamePiece: color,
            col: move.colIdx,
            row: move.rowIdx,
          },
          playerID: color === 'Red' ? redID : yellowID,
        });
        movesMade[move.rowIdx][move.colIdx] = color === 'Red' ? 'R' : 'Y';
        queues[color] = queue.filter(m => m !== move);
        colHeights[move.colIdx] -= 1;
        return;
      }
    }
    // If we get here, we couldn't make any moves
    logger.table(pattern);
    logger.table(movesMade);
    throw new Error(
      `Unable to apply pattern: ${JSON.stringify(pattern, null, 2)}
      If this is a pattern in the autograder: are you sure that you checked for game-ending conditions? If this is a pattern you provided: please double-check your pattern - it may be invalid.`,
    );
  };
  const gameOver = () => game.state.status === 'OVER';
  while (queues.Yellow.length > 0 || queues.Red.length > 0) {
    // Try to make a move for the first player in the queue
    makeMove(firstColor);
    // If the game is over, return
    if (gameOver()) return;

    // Try to make a move for the second player in the queue
    makeMove(firstColor === 'Red' ? 'Yellow' : 'Red');
    if (gameOver()) return;
  }
}

describe('ConnectFourGame', () => {
  let game: ConnectFourGame;
  beforeEach(() => {
    game = new ConnectFourGame();
  });
  describe('_join', () => {
    it('should throw an error if the player is already in the game', () => {
      const player = createPlayerForTesting();
      game.join(player);
      expect(() => game.join(player)).toThrowError(PLAYER_ALREADY_IN_GAME_MESSAGE);
      const player2 = createPlayerForTesting();
      game.join(player2);
      expect(() => game.join(player2)).toThrowError(PLAYER_ALREADY_IN_GAME_MESSAGE);
    });
    it('should throw an error if the player is not in the game and the game is full', () => {
      const player1 = createPlayerForTesting();
      const player2 = createPlayerForTesting();
      const player3 = createPlayerForTesting();
      game.join(player1);
      game.join(player2);

      expect(() => game.join(player3)).toThrowError(GAME_FULL_MESSAGE);
    });
  });
  describe('applyMove', () => {
    const red = createPlayerForTesting();
    const yellow = createPlayerForTesting();
    beforeEach(() => {
      game.join(red);
      game.join(yellow);
      game.startGame(red);
      game.startGame(yellow);
    });

    describe('Determining who is the first player', () => {
      test('If there is no prior game, the first player is red', () => {
        expect(game.state.firstPlayer).toEqual('Red');
      });
    });
    describe('when given a move that does not win the game, it does not end it', () => {
      test('Sample test', () => {
        createMovesFromPattern(
          game,
          [
            ['_', '_', '_', '_', '_', '_', '_'],
            ['_', '_', '_', '_', '_', '_', '_'],
            ['_', '_', '_', '_', '_', '_', '_'],
            ['_', '_', '_', '_', '_', '_', '_'],
            ['_', 'Y', 'Y', '_', '_', '_', '_'],
            ['_', 'R', 'R', '_', '_', '_', '_'],
          ],
          red.id,
          yellow.id,
          'Red',
        );
        expect(game.state.status).toBe('IN_PROGRESS');
        expect(game.state.winner).toBeUndefined();
      });
    });
  });
});
