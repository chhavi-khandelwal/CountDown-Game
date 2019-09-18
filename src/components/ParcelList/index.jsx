import React from 'react';
import './parcelList.scss';
import Parcel from '../Parcel';

const ParcelList = props => {
  const list = props.droppedLetters;
  const { onDrop, decideDrop } = props;

  return (
    <ul className="droppable-list">
      {
        list.map((item, index) =>
          <Parcel
            item={ item }
            onDrop = { () => onDrop(item.name, index) }
            decideDrop = { () => decideDrop(index) }
            key={ index }>
          </Parcel>
        )
      }
    </ul>
  )
}

export default ParcelList;
