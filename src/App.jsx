import { useState } from 'react';
import './App.css';
import Cell from './components/Cell';
import Board from './components/Board';
import ResetButton from './components/ResetButton.jsx';
import GameText from './components/GameText.jsx';
import HistoryMoveList from './components/HistoryMoveList.jsx';

function App() {
  const initialCells = Array.from({ length: 9 }, (_, index) => ({
    id: `case-${index + 1}`,
    value: '',
    highlighted: false,
  }));

  const [cells, setCells] = useState(initialCells);
  const [historyCells, setHistoryCells] = useState([cells]);

  const getNextPlayerTurn = () => {
    if (
      cells.filter((cell) => cell.value === 'X').length ===
      cells.filter((cell) => cell.value === 'O').length
    ) {
      return 'X';
    }
    return 'O';
  };

  const isPlayable = (id) => {
    if (checkWinner(cells) || isDraw(cells)) {
      return false;
    }
    if (
      cells.filter((cell) => cell.value !== '').length !==
      historyCells.length - 1
    ) {
      return false;
    }
    const cellToPlay = cells.find((cell) => cell.id === id);
    if (cellToPlay && cellToPlay.value === '') {
      return true;
    }
    return false;
  };

  const checkWinner = (cells) => {
    const winningCombinations = [
      [0, 1, 2], // Ligne 1
      [3, 4, 5], // Ligne 2
      [6, 7, 8], // Ligne 3
      [0, 3, 6], // Colonne 1
      [1, 4, 7], // Colonne 2
      [2, 5, 8], // Colonne 3
      [0, 4, 8], // Diagonale 1
      [2, 4, 6], // Diagonale 2
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        cells[a].value &&
        cells[a].value === cells[b].value &&
        cells[a].value === cells[c].value
      ) {
        return {
          winner: cells[a].value,
          winningCells: [a, b, c],
        };
      }
    }
    return null;
  };

  const isDraw = () => {
    if (
      cells.filter((cell) => cell.value === 'X').length === 5 &&
      cells.filter((cell) => cell.value === 'O').length === 4
    ) {
      return true;
    }
    return null;
  };

  const resetGame = () => {
    setCells(initialCells);
    setHistoryCells([initialCells]);
  };

  const handleClick = (id) => {
    if (isPlayable(id)) {
      setCells((prevCells) => {
        const updatedCells = prevCells.map((cell) => {
          if (cell.id === id) {
            return {
              ...cell,
              value: getNextPlayerTurn(),
            };
          }
          return cell;
        });

        // Vérifier s'il y a un gagnant
        const result = checkWinner(updatedCells);
        let finalCells;

        if (result) {
          // Surbriller les cellules gagnantes
          finalCells = updatedCells.map((cell, index) => ({
            ...cell,
            highlighted: result.winningCells.includes(index),
          }));
        } else {
          finalCells = updatedCells;
        }

        // Mettre à jour l'historique avec les cellules finales
        setHistoryCells([...historyCells, finalCells]);
        return finalCells;
      });
    }
    return null;
  };

  const handleFooterText = () => {
    const result = checkWinner(cells);
    if (result) {
      return `Player ${result.winner} Won !`;
    } else if (isDraw()) {
      return "It's a Draw !";
    }
    return `Player Turn : ${getNextPlayerTurn()}`;
  };

  const handleHistoryClick = (index) => {
    const newCells = historyCells[index].slice();
    setCells(newCells);
  };

  return (
    <>
      <div className="game-container">
        <Board>
          {cells.map((cell) => (
            <Cell
              key={cell.id}
              id={cell.id}
              value={cell.value}
              highlighted={cell.highlighted}
              onClick={() => handleClick(cell.id)}
            />
          ))}
        </Board>
        <HistoryMoveList
          history={historyCells}
          onClick={(index) => handleHistoryClick(index)}
          winningPlayer={
            checkWinner(historyCells[historyCells.length - 1])?.winner
          }
        />
      </div>
      <div className="footerGame">
        <ResetButton value="Reset" onClick={resetGame} />
        <GameText value={handleFooterText()} />
      </div>
    </>
  );
}

export default App;
