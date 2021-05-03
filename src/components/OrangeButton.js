const OrangeButton = (props) => {
  let button = (
    <button
      className="btn orange-btn font-weight-bold"
    >
      {props.text}
    </button>
  );

  if (props.isDisabled) {
    button = (
      <button
        className="btn orange-btn font-weight-bold disabled"
      >
        {props.text}
      </button>
    );
  }

  return button;
};

export default OrangeButton;
