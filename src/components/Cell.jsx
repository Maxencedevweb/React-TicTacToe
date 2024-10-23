import '../css/Case.css';

const Cell = (props) => {
  const { id, onClick, value } = props;

  return (
    <button id={id} className="case" onClick={onClick}>
      {value}
    </button>
  );
};

export default Cell;
