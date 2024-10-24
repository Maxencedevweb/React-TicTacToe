import '../css/historyMoveList.css';

const HistoryMoveList = (props) => {
  const { history, onClick, winningPlayer } = props;

  return (
    <ol className="historyMoveList">
      {history.map((_, index) => {
        let value = '';
        if (winningPlayer && index === history.length - 1) {
          value = `Player ${winningPlayer} Won`;
        } else if (index) {
          value = `Go to move #${index}`;
        } else {
          value = 'Go to game start';
        }

        return (
          <li key={index} id={index}>
            {index + 1 + '.'}
            <button onClick={() => onClick(index)}>{value}</button>
          </li>
        );
      })}
    </ol>
  );
};

export default HistoryMoveList;
