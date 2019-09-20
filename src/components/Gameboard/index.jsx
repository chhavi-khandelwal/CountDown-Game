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
import { NotificationEnum } from '../../enums/NotificationEnum';
import { delimiter, wrongAttemptThreshold } from '../../enums/constants';
import { createList } from '../../services/utils';

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
      let droppedLetters = this.state.droppedLetters, isCorrect = true, notification = '';

      if (!lastDraggedItem.name) { return { droppedLetters }; }

      //logic for wrong attempts
      if (this.validWord[to] !== lastDraggedItem.name) {
        this.wrongAttempt++;
        isCorrect = false;
        if (this.wrongAttempt < wrongAttemptThreshold) {
          return { droppedLetters, notification: NotificationEnum.INCORRECT_INSERTION };
        }
      }

      const currentDroppedLetter = { name: lastDraggedItem.name, from: lastDraggedItem.position, to , isCorrect };
      if (!isNaN(currentDroppedLetter.to)) {
        droppedLetters[currentDroppedLetter.to] = currentDroppedLetter;
      }

      //add third wrong letter to dropped collection to show in the UI with incorrect insertion
      if (this.wrongAttempt === wrongAttemptThreshold) {
        this.props.stopGame(GameStatus.FAIL);
        this.isWordCorrect = false;
        this.gongSound = true;
        return { droppedLetters: droppedLetters, notification: NotificationEnum.INCORRECT_THRESHOLD };
      }

      //logic for correct word completion
      const word = droppedLetters.reduce((word, letter) =>  word += (letter.name === delimiter ? '' : letter.name), '');
      if (word.length === this.validWord.length) {
        this.props.updateScore();
        this.props.stopGame(GameStatus.PASS);
        notification = NotificationEnum.SUCCESS;
        this.isWordCorrect = true;
      }

      return { droppedLetters: droppedLetters, notification: notification };
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
    this.setState(
      { lastDraggedItem: { name: item, position: from } });
  }

  /**
   * decide on whether eligible to drop or not
   * @param {index} to drop on
   * returns boolean
   */
  decideDrop = index => {
    //dnd api : return true to drop else false
    const droppedLetters = this.state.droppedLetters;
    for (let i = 0; i < droppedLetters.length; i++) {
      //drop if 
      if (droppedLetters[i].to === index) {
        this.setState({
          lastDraggedItem: {}
        });
        return false;
      }
    }
    return true;
  }

  /**
   * dnd api to decide on what happens when dragged
   * @param {index} to drop on
   * returns boolean
   */
  handleDrag = (item, index) => {
    //disable all draggable option and stop clock after max. threshold
    const gameStopped = this.hasGameStopped();
    if (gameStopped) { return false; }

    const droppedLetters = this.state.droppedLetters;
    for (let i = 0; i < droppedLetters.length; i++) {
      if (droppedLetters[i].from === index) { return false; }
    }
    return true;
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
