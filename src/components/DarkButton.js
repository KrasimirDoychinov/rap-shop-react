const DarkButton = (props) => {
  let button = (
    <button className="btn dark-btn mt-2 float-right font-weight-bold">
      {props.text}
    </button>
  );

  if (props.isDisabled) {
    button = (
      <button
        className="btn dark-btn mt-2 float-right font-weight-bold disabled"
        disabled
      >
        CREATE
      </button>
    );
  }

  return button;
};

export default DarkButton;
