import React from 'react';
import './pickList.scss';
import Pick from '../Pick';

const PickList = props => {
  const { collection } = props;
  const collectionString = collection.join('');

  const { handleDrag, onDrag, disableDrag } = props;
  return (
    <ul className="draggable-list">
      {
        collection.map((item, index) => 
          <Pick
            item={ item }
            type="dragger"
            key={ collectionString + '_' + index }
            onDrag={ () => onDrag(item, index) }
            handleDrag={ () => handleDrag(item, index) }
            disableDrag={ disableDrag }>
          </Pick>
        )
      }
    </ul>
  )
}

export default PickList;
