import '../css/Cell.css';

const Cell = (props) => {
  const { id, onClick, value, highlighted } = props;

  return (
    <button
      id={id}
      className={`case ${highlighted ? 'highlighted' : ''}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Cell;
