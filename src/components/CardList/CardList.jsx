import React from 'react';
import './cardList.scss';
import Alphabet from '../Alphabet/Alphabet';

const CardList = props => {
  const { collection } = props;
  const collectionString = collection.join('');

  const { handleDrag, onDrag, disableDrag } = props;
  return (
    <ul className="draggable-list">
      {
        collection.map((item, index) => 
          <Alphabet
            item={ item }
            type="dragger"
            key={ collectionString + '_' + index }
            onDrag={ () => onDrag(item, index) }
            handleDrag={ () => handleDrag(item, index) }
            disableDrag={ disableDrag }>
          </Alphabet>
        )
      }
    </ul>
  )
}

export default CardList;
