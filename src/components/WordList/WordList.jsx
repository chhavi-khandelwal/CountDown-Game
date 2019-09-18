import React from 'react';
import './wordList.scss';
import Pick from '../Pick/Pick';

const WordList = props => {
  const list = props.droppedLetters;
  const { onDrop, decideDrop } = props;

  return (
    <ul className="droppable-list">
      {
        list.map((item, index) =>
          <Pick
            item={ item }
            onDrop = { () => onDrop(item.name, index) }
            decideDrop = { () => decideDrop(index) }
            key={ index }>
            </Pick>
        )
      }
    </ul>
  )
}

export default WordList;
