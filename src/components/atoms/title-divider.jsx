import React from 'react';

const TitleDivider = ({ titleText }) => (
  <div className="title">
    <p className="title__text">{ titleText }</p>
    <div className="title__line"></div>
  </div>
);

export default TitleDivider;
