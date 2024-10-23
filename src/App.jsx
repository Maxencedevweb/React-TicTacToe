import { useState } from 'react';
import './App.css';
import Cell from './components/Cell';
import Board from './components/Board';
import ResetButton from './components/ResetButton.jsx';
import GameText from './components/GameText.jsx';

function App() {
  const initialCells = Array.from({ length: 9 }, (_, index) => ({
    id: `case-${index + 1}`,
    value: '',
  }));

  const [isPlaying, setIsPlaying] = useState(true);
  const [cells, setCells] = useState(initialCells);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [countTurn, setCountTurn] = useState(0);
  const [winner, setWinner] = useState(null);

  const isPlayable = (cell, id) => {
    const cellToPlay = cells.find((cell) => cell.id === id);
    if (cellToPlay && cellToPlay.value === '') {
      return true;
    }
    return false;
  };

  const changePlayerTurn = () => {
    currentPlayer === 'X' ? setCurrentPlayer('O') : setCurrentPlayer('X');
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
        setIsPlaying(false);
        setWinner(cells[a].value); // Retourne le joueur gagnant ('X' ou 'O')
      }
    }
    // Gerer le cas du match nul
    console.log(countTurn);
    if (countTurn === 8) {
      setIsPlaying(false);
      setWinner('Draw');
    }
  };

  const resetGame = () => {
    setCells(initialCells);
    setCountTurn(0);
    setIsPlaying(true);
    setWinner(null);
  };

  const handleClick = (event, id) => {
    if (isPlaying) {
      if (isPlayable(cells, id)) {
        setCountTurn((prevCount) => prevCount + 1);
        setCells((prevCells) => {
          const updatedCells = prevCells.map((cell) => {
            if (cell.id === id) {
              return {
                ...cell,
                value: currentPlayer,
              };
            }
            return cell;
          });
          checkWinner(updatedCells);
          if (winner === null) {
            changePlayerTurn();
          }
          return updatedCells;
        });
      }
    }
    return null;
  };

  const handleText = (winner) => {
    if (winner === 'X' || winner === 'O') {
      return `Player ${winner} Won !`;
    } else if (winner === 'Draw') {
      return "It`'s a Draw !";
    }
    return `Player Turn : ${currentPlayer}`;
  };

  return (
    <>
      <Board>
        {cells.map((cell) => {
          return (
            <Cell
              key={cell.id}
              id={cell.id}
              value={cell.value}
              onClick={(event) => handleClick(event, cell.id)}
            />
          );
        })}
      </Board>
      <div className="footerGame">
        <ResetButton value="Reset" onClick={resetGame} />
        <GameText value={handleText(winner)} />
      </div>
    </>
  );
}

export default App;
