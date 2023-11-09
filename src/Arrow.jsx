const Arrow = ({ direction, onClick, isDisabled }) => {
  const arrowSymbol = direction === "left" ? "←" : "→";
  return (
    <div>
      <button onClick={onClick} disabled={isDisabled}>
        {arrowSymbol}
      </button>
    </div>
  );
};

export default Arrow;
