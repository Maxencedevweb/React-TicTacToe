import "../css/ResetButton.css";
const ResetButton = (props) => {
  const { value, onClick } = props;

  return (
    <button className="resetButton" onClick={onClick}>
      {value}
    </button>
  );
};

export default ResetButton;
