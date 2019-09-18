import React from 'react';
import './pick.scss';
import Card from '../Card/Card';
import { useDrop } from 'react-dnd';

const style = {
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  cursor: 'move',
  float: 'left',
};

const Pick = ({item, onDrop, decideDrop}) => {
  const [{}, drop] = useDrop({
    accept: "dragger",
    drop: onDrop,
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    }),
    hover: (item, monitor) => decideDrop()
  });

  return (
    <Card
      item={ item.name }
      isValid={ item.isCorrect }
      style={{ ...style }}
      reference={ drop }></Card>
  );
}

export default Pick;
