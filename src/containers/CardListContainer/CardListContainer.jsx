import React from 'react';
import './cardListContainer.scss';
import CardList from '../../components/CardList/CardList';

class CardListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const { onDrag, handleDrag, jumbledWord, disableDrag } = this.props;
    return (
      <CardList
        collection={ jumbledWord.toUpperCase().split('') }
        onDrag={ onDrag }
        handleDrag={ handleDrag }
        disableDrag={ disableDrag }></CardList>
    );
  }
}

export default CardListContainer;
