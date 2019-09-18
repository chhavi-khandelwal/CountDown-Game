import React from 'react';
import './parcel.scss';
import Card from '../Card';
import { useDrop } from 'react-dnd';

const Parcel = ({item, onDrop, decideDrop}) => {
  const drop = useDrop({
    accept: "dragger",
    drop: onDrop,
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    }),
    hover: () => decideDrop()
  })[1];

  return (
    <Card
      item={ item.name }
      isValid={ item.isCorrect }
      classes={ 'answer-card' }
      reference={ drop }></Card>
  );
}

export default Parcel;
