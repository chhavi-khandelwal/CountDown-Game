import React from 'react';
import  { wordService } from '../../services/wordService';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Gameboard from '../Gameboard/Gameboard';
import  { GameStatus } from '../../enums/GameStatus';
import  { JumbledWordLength } from '../../enums/constants';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.validWord = wordService.getValidWord();
    this.jumbledWord = wordService.getJumbledWord(this.validWord, JumbledWordLength);

    this.state = {
      gameStatus: GameStatus.STARTED
    };
  }

  resetGame = () => {
    this.validWord = wordService.getValidWord();
    this.jumbledWord = wordService.getJumbledWord(this.validWord, JumbledWordLength);
    console.log(this.validWord, this.jumbledWord)

    this.setState({ gameStatus: GameStatus.STARTED });
  }

  startGame = () => {
    this.setState({ gameStatus: GameStatus.INPROGRESS });
  }

  stopGame = (status) => {
    this.setState({ gameStatus: GameStatus[status] });
  }

  render() {
    return (
      <DndProvider backend={ HTML5Backend }>
        {this.props.startGame && <Gameboard
          validWord={ this.validWord }
          jumbledWord={ this.jumbledWord }
          resetGame={ this.resetGame }
          gameStatus= { this.state.gameStatus }
          startGame={ this.startGame }
          stopGame={ this.stopGame }>
        </Gameboard>}
      </DndProvider>
    );
  }
}

export default Game;
