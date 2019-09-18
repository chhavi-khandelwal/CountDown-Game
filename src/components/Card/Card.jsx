import React from 'react';
import './card.scss';

const Card = ({ item, style, reference, isValid, disable }) => {
  return (
    <li
      style={{ ...style }}
      className={'card ' + (isValid === false ? 'invalid' : '') + (disable ? ' disable' : '') + (isValid ? ' valid' : '') }
      ref={ reference }>{ item }</li>
  );
}

export default Card;
