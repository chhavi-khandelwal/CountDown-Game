import React from 'react';
import './pick.scss';
import Card from '../Card';
import { useDrag } from 'react-dnd';

const Pick = props => {
  const { item, type, onDrag, handleDrag, disableDrag } = props;
  const canDrag = handleDrag();

  function checkDraggable (monitor) {
    if (monitor.isDragging()) {
      onDrag();
      return 0.7;
    }
    else if (!canDrag) {
      return 0.7;
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
