import React from 'react';
import './parcel.scss';
import Card from '../Card';
import { useDrop } from 'react-dnd';

const Parcel = props => {
  const { item, onDrop, decideDrop } = props;

  const drop = useDrop({
    accept: "dragger",
    drop: onDrop,
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
