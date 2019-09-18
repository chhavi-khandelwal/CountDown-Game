import React from 'react';
import './pick.scss';
import Card from '../Card/Card';
import { useDrop } from 'react-dnd';

const Pick = ({item, onDrop, decideDrop}) => {
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

export default Pick;
