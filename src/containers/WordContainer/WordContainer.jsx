import React from 'react';
import './wordContainer.scss';
import WordList from '../../components/WordList/WordList';

class WordContainer extends React.Component {
  render() {
    const { size, onDrop, decideDrop, droppedLetters } = this.props;
    return (
      <WordList size={ size }
        onDrop={ onDrop }
        droppedLetters={ droppedLetters }
        decideDrop={ decideDrop }></WordList>
    );
  }
}

export default WordContainer;
