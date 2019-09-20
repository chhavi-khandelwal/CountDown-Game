import React from 'react';
import './gameboard.scss';
import Clock from '../Clock';
import PickListContainer from '../../containers/PickListContainer';
import ParcelListContainer from '../../containers/ParcelListContainer';
import Result from '../Result';
import Notification from '../Notification';
import ScoreBoard from '../ScoreBoard';
import Audio from '../Audio';
import { GameStatus } from '../../enums/GameStatus';
import { delimiter } from '../../enums/constants';
import { createList } from '../../services/utils';
import { dnd } from '../../services/dnd';

//This component manages the state of draggedLetters, droppedLetters, notification
const initialState = {
  notification: '',
  draggedLetters: [],
  lastDraggedItem: {}
};

class Gameboard extends React.Component {
  constructor(props) {
    super(props);
    this.reset({ ignoreStateInitializaton: true });
    this.state = { ...initialState, ...{ droppedLetters: this.emptyList }};
  }

  reset = (options = {}) => {
    this.validWord = this.props.validWord;
    console.log(this.validWord)
    this.jumbledWord = this.props.jumbledWord;
    this.wrongAttempt = 0;
    this.gongSound = false;
    this.isWordCorrect = false;
    this.emptyList = createList(this.validWord.length, delimiter);
    if (!options.ignoreStateInitializaton) {
      this.setState({ ...initialState, ...{ droppedLetters: this.emptyList }});
    }
  }

  componentDidMount() {
    this.props.startGame();
  }

  componentDidUpdate() {
    if (this.props.gameStatus === GameStatus.STARTED) {
      this.props.startGame();
      this.reset();
    }
  }

   /**
   * callback to dnd library on drop
   * @param {item} item to drop
   * @param {to} index to drop on
   * returns collection of drooped Items|notification state
   */
  onDrop = (item, to) => {
    this.setState(() => {
      const lastDraggedItem = this.state.lastDraggedItem;
      let droppedLetters = this.state.droppedLetters, notification = '';
      const callbacks = {
        stopGame: this.props.stopGame,
        updateScore: this.props.updateScore,
      };
  
      const letterConfig = dnd.getDroppedLettersConfig(lastDraggedItem, droppedLetters, to, this.validWord, this.wrongAttempt, callbacks);
      this.wrongAttempt = letterConfig.wrongAttempt || this.wrongAttempt;
      this.isWordCorrect = letterConfig.isWordCorrect;
      this.gongSound = letterConfig.gongSound;
      return {
        droppedLetters: letterConfig.droppedLetters || droppedLetters,
        notification: letterConfig.notification || notification
      }
    });
    //remove notification after a second
    if (this.state.notification) {
      setTimeout(() => { this.setState({ notification: '' }); }, 1000);
    }
  }

  /**
   * callback to dnd library on drag
   * @param {item} item to drag
   * @param {from} index to pick from
   */
  onDrag = (item, from) => {
    // start new game: case when wrong attempt threshold is reached
    if (this.props.gameStatus === GameStatus.STARTED) {
      this.props.startGame();
    }
    this.setState({ lastDraggedItem: { name: item, position: from } });
  }

  /**
   * decide on whether eligible to drop or not
   * @param {index} to drop on
   * returns { boolean } (true to drop else false)
   */
  decideDrop = dropIndex => {
    const isDroppable = dnd.isDroppable(this.state.droppedLetters, dropIndex);
    if (!isDroppable) { this.setState({ lastDraggedItem: {} }); }
    return isDroppable;
  }

  /**
   * dnd api to decide on what happens when dragged
   * @param { index } to drop on
   * returns boolean
   */
  handleDrag = index => {
    //disable all draggable option and stop clock after max. threshold
    if (this.hasGameStopped()) { return false; }
    return dnd.isDraggable(this.state.droppedLetters, index);
  }

  toggleSound = () => {
    this.gongSound = false;
    this.setState({ soundStatus: !this.state.soundStatus });
  }

  hasGameStopped = () => {
    return !(this.props.gameStatus === GameStatus.STARTED || this.props.gameStatus === GameStatus.INPROGRESS);
  }

  render() {
    const { droppedLetters, notification, soundStatus } = this.state;
    const hasGameStopped = this.hasGameStopped();

    return (
      <div className="gameboard">
        <ScoreBoard score={ this.props.score }
          wrongAttempts={ this.wrongAttempt }>
        </ScoreBoard>

        <Audio soundStatus={ soundStatus }
          tickSound={ !hasGameStopped }
          cheerSound={ this.isWordCorrect }
          gongSound={ this.gongSound }
          toggleSound={ this.toggleSound }>
        </Audio>

        <Notification notification={ notification }></Notification>

        <Clock isClockTicking={ !hasGameStopped  }
          stopGame={ this.props.stopGame }
          gameStatus={ this.props.gameStatus }>
        </Clock>

        <PickListContainer jumbledWord={ this.jumbledWord }
          onDrag={ this.onDrag }
          handleDrag={ this.handleDrag }
          disableDrag={ hasGameStopped }>
        </PickListContainer>

        <ParcelListContainer size={ this.validWord.length } 
          onDrop={ this.onDrop }
          droppedLetters={ droppedLetters }
          decideDrop={ this.decideDrop }>
        </ParcelListContainer>

        {  hasGameStopped && <Result
            resetGame={ this.props.resetGame }
            isCorrect={ this.isWordCorrect }>
        </Result>}
      </div>
    );
  }
}
export default Gameboard;
