import '../css/Board.css';

const Board = (props) => {
  const { children } = props;

  return <div className="board">{children}</div>;
};
export default Board;
