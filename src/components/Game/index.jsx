import React from 'react';
import  { wordService } from '../../services/wordService';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Gameboard from '../Gameboard';
import  { GameStatus } from '../../enums/GameStatus';
import  { JumbledWordLength } from '../../enums/constants';

const initialState = {
  gameStatus: GameStatus.STARTED
};

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.reset({ ignoreStateInitializaton: true });
  }

  reset = (options = {}) => {
    this.validWord = wordService.getValidWord();
    this.jumbledWord = wordService.getJumbledWord(this.validWord, JumbledWordLength);
    if (!options.ignoreStateInitializaton) {
      this.setState(initialState);
    }
  }

  startGame = () => {
    this.setState({ gameStatus: GameStatus.INPROGRESS });
  }

  stopGame = (status) => {
    this.setState({ gameStatus: GameStatus[status] });
  }

  render() {
    const { gameStatus } = this.state;
    return (
      <DndProvider backend={ HTML5Backend }>
        {this.props.startGame && <Gameboard
          validWord={ this.validWord }
          jumbledWord={ this.jumbledWord }
          resetGame={ this.reset }
          gameStatus= { gameStatus }
          startGame={ this.startGame }
          stopGame={ this.stopGame }>
        </Gameboard>}
      </DndProvider>
    );
  }
}

export default Game;
