import React from 'react';
import './parcelListContainer.scss';
import ParcelList from '../../components/ParcelList';

const ParcelListContainer = props => {
    const { size, onDrop, decideDrop, droppedLetters } = props;
    return (
      <ParcelList size={ size }
        onDrop={ onDrop }
        droppedLetters={ droppedLetters }
        decideDrop={ decideDrop }></ParcelList>
    );
}

export default ParcelListContainer;
