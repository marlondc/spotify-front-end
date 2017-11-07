import React from 'react';

const StartButton = ({ clickHandler }) => (
  <div className="input__button--play">
    <button
      className="input__button"
      onClick={clickHandler}
    > PLAY </button>
  </div>
);

export default StartButton;
