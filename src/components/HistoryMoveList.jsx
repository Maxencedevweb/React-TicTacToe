import { useRef, useEffect } from 'react';
import '../css/historyMoveList.css';

const HistoryMoveList = (props) => {
  const { history, onClick, winningPlayer } = props;

  // Référence pour la liste d'historique
  const historyListRef = useRef(null);

  // Fonction pour défiler automatiquement vers le bas
  const scrollToBottom = () => {
    if (historyListRef.current) {
      historyListRef.current.scrollTop = historyListRef.current.scrollHeight;
    }
  };

  // Utilisation de useEffect pour déclencher le défilement à chaque mise à jour de "history"
  useEffect(() => {
    scrollToBottom();
  }, [history]);

  return (
    <div className="history-container">
      <h3 className="history-title">Game History</h3>
      <ol className="history-list" ref={historyListRef}>
        {history.map((_, index) => {
          let value = '';
          if (winningPlayer && index === history.length - 1) {
            value = `Player ${winningPlayer} Won!`;
          } else if (index) {
            value = `Go to move #${index}`;
          } else {
            value = 'Go to game start';
          }

          return (
            <li
              key={index}
              className={`history-item ${
                index === history.length - 1 ? 'current' : ''
              }`}
            >
              <span className="move-number">{index + 1}</span>
              <button
                className={`history-button ${
                  winningPlayer && index === history.length - 1 ? 'winner' : ''
                }`}
                onClick={() => onClick(index)}
              >
                {value}
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default HistoryMoveList;
