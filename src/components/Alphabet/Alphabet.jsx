import React from 'react';
import './alphabet.scss';
import Card from '../Card/Card';
import { useDrag } from 'react-dnd';

const style = {
  border: '1px dashed gray',
  cursor: 'move'
};

const Alphabet = ({ item, type, onDrag, handleDrag, disableDrag }) => {
  const canDrag = handleDrag();

  function a (monitor) {
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
      opacity: a(monitor)
    })
  });

  return (<Card
            disable={ disableDrag }
            item={ item }
            style={{ ...style, opacity }}
            reference={ drag }>
          </Card>)
};

export default Alphabet;
