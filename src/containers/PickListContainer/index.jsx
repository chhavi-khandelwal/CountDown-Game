import React from 'react';
import './pickListContainer.scss';
import PickList from '../../components/PickList';

const PickListContainer = props => {
  const { onDrag, handleDrag, jumbledWord, disableDrag } = props;

  return (
    <PickList
      collection={ jumbledWord.toUpperCase().split('') }
      onDrag={ onDrag }
      handleDrag={ handleDrag }
      disableDrag={ disableDrag }></PickList>
  );
}

export default PickListContainer;
