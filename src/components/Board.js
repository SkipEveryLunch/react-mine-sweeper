import React, { useState, useEffect, useCallback } from 'react';
import CellData from '../classes/CellData';
import Cell from './Cell';
import {
  compareArrays,
  randomMultiFrom2DArray,
  getAdjacentElementsINArray,
} from '../helpers';
const Board = () => {
  const [cells, setCells] = useState([]);
  const size = 9;
  const numOfMines = 10;
  //TODO:useCallbackでキャッシュ化したい
  const flipCell = useCallback(
    (x, y) => {
      const newCells = [...cells];
      let isBombed = false;
      const innerFlip = (x, y, propagated) => {
        let willPropagate = true;
        newCells.forEach((row) => {
          row.forEach((cell) => {
            if (cell.x === x && cell.y === y) {
              if (cell.isMine || cell.neighbor > 0 || cell.isFliped) {
                willPropagate = false;
              }
              cell.isFliped = true;
              if (cell.isMine && !cell.propagated) {
                isBombed = true;
              }
            }
          });
        });
        if (willPropagate) {
          const adjacentCells = getAdjacentElementsINArray(x, y, cells);
          adjacentCells.forEach((adjacentCell) => {
            innerFlip(adjacentCell[0], adjacentCell[1], true);
          });
        }
      };
      innerFlip(x, y, false);
      setCells(newCells);
      //TODO: flipしたセルの合計はstateにして
      //cellsに変更があるたびにuseEffectで更新。
      //size * size - numOfMinest以上になったらクリアとする
      const flipedCells = cells.reduce((prev, cur) => {
        let sum = 0;
        cur.forEach((cell) => {
          if (cell.isFliped) {
            sum++;
          }
        });
        return prev + sum;
      }, 0);
      if (!isBombed && flipedCells >= size * size - numOfMines) {
        setTimeout(() => {
          alert('congrats! you clear');
          initializeGame();
        }, 250);
        //TODO:モーダルで出したい
      }
      if (isBombed) {
        setTimeout(() => {
          alert('you dead');
          //TODO:モーダルで出したい
          initializeGame();
        }, 250);
      }
    },
    [cells]
  );

  //TODO:useCallbackでキャッシュ化したい
  const flagCell = useCallback(
    (x, y) => {
      const newCells = cells.map((row) => {
        return row.map((cell) => {
          if (cell.x === x && cell.y === y) {
            return !cell.isFliped
              ? { ...cell, isFlaged: !cell.isFlaged }
              : cell;
          } else {
            return cell;
          }
        });
      });
      setCells(newCells);
    },
    [cells]
  );
  const initializeGame = () => {
    //initiate game
    //create empty cells
    const newCells = [];
    for (let i = 0; i < size; i++) {
      newCells.push([]);
    }
    newCells.forEach((row, i) => {
      for (let j = 0; j < size; j++) {
        row.push(new CellData(j, i));
      }
    });
    //plant mines
    const mineCells = randomMultiFrom2DArray(newCells, numOfMines);
    mineCells.forEach((mineCell) => {
      newCells[mineCell[0]][mineCell[1]].isMine = true;
    });
    //count neighbor mines for each cell
    newCells.forEach((row, x) => {
      row.forEach((cell, y) => {
        let num = 0;
        const adjacentElements = getAdjacentElementsINArray(x, y, newCells);
        adjacentElements.forEach((adjacentCell) => {
          mineCells.forEach((mineCell) => {
            if (compareArrays(adjacentCell, mineCell)) {
              num++;
            }
          });
        });
        cell.neighbor = num;
      });
    });
    setCells(newCells);
  };
  useEffect(() => {
    initializeGame();
  }, []);
  return (
    <div className="h-screen grid place-items-center">
      <div className="flex flex-col gap-1">
        {cells.length
          ? cells.map((el) => {
              return (
                <div className="flex gap-1">
                  {el.map((data, idx) => {
                    return (
                      <Cell
                        flipCell={flipCell}
                        flagCell={flagCell}
                        data={data}
                        key={idx}
                      />
                    );
                  })}
                </div>
              );
            })
          : ''}
      </div>
    </div>
  );
};
export default Board;
