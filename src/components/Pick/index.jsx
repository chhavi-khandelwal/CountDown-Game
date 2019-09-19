import React from 'react';
import './pick.scss';
import Card from '../Card';
import { useDrag } from 'react-dnd';
import { cardOpacity } from '../../enums/constants';

const Pick = props => {
  const { item, type, onDrag, handleDrag, disableDrag } = props;
  const canDrag = handleDrag();


  //check if draggable: dnd api
  function checkDraggable (monitor) {
    if (monitor.isDragging()) {
      onDrag();
      return cardOpacity;
    }
    else if (!canDrag) {
      return cardOpacity;
    }
  }

  const [{ opacity }, drag] = useDrag({
    item: { item, type },
    canDrag: canDrag,
    collect: monitor => ({
      opacity: checkDraggable(monitor)
    })
  });

  return (
    <Card
      disable={ disableDrag }
      item={ item }
      classes={ ' question-card ' }
      style={{ opacity }}
      reference={ drag }>
    </Card>
  )
};

export default Pick;
