import React from 'react';
import './gameboard.scss';
import Clock from '../Clock/Clock';
import CardListContainer from '../../containers/CardListContainer/CardListContainer';
import WordContainer from '../../containers/WordContainer/WordContainer';
import Result from '../Result/Result';
import Notification from '../Notification/Notification';
import Audio from '../Audio/Audio';
import { GameStatus } from '../../enums/GameStatus.js';
import { NotificationEnum } from '../../enums/NotificationEnum.js';
import { delimiter, wrongAttemptThreshold } from '../../enums/constants';
import { createList } from '../../services/utils';

class Gameboard extends React.Component {
  constructor(props) {
    super(props);
    const { validWord, jumbledWord } = this.props;
    
    this.validWord = validWord;
    this.emptyList = createList(this.validWord.length, delimiter);
    this.jumbledWord = jumbledWord;
    this.wrongAttempt = 0;
    this.isWordCorrect = false;
    this.sound = { gong: '' };

    this.state = {
      notification: '',
      draggedLetters: [],
      droppedLetters: createList(this.validWord.length, delimiter),
      lastDraggedItem: {}
    };
  }

  resetGameBoard() {
    this.validWord = this.props.validWord;
    this.jumbledWord = this.props.jumbledWord;
    this.wrongAttempt = 0;
    this.isWordCorrect = false;
    this.resetSoundSystem();
    this.setState({
      notification: '',
      draggedLetters: [],
      droppedLetters: createList(this.validWord.length, delimiter),
      lastDraggedItem: {}
    });
  }

  componentDidMount() {
    this.props.startGame();
  }

  componentDidUpdate() {
    if (this.props.gameStatus === GameStatus.STARTED) {
      this.props.startGame();
      this.resetGameBoard();
    }
  }

  resetSoundSystem = () => {
    this.sound.gong = '';
  }

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

      if (this.wrongAttempt === wrongAttemptThreshold) {
        this.props.stopGame(GameStatus.FAIL);
        this.sound.gong = true;
        this.isWordCorrect = false;
        return { droppedLetters: droppedLetters, notification: NotificationEnum.INCORRECT_THRESHOLD };
      }

      //logic for correct word completion
      const word = droppedLetters.reduce((word, letter) =>  word += (letter.name === delimiter ? '' : letter.name), '');
      if (word.length === this.validWord.length) {
        this.props.stopGame(GameStatus.PASS);
        notification = NotificationEnum.SUCCESS;
        this.isWordCorrect = true;
      }

      return { droppedLetters: droppedLetters, notification: notification };
    });

    if (this.state.notification) {
      setTimeout(() => { this.setState({ notification: '' }); }, 2000);
    }
  }

  onDrag = (item, from) => {
    if (this.props.gameStatus === GameStatus.STARTED) {
      this.props.startGame();
    }
    this.setState(
      { lastDraggedItem: { name: item, position: from } });
  }

  decideDrop = (index) => {
    const droppedLetters = this.state.droppedLetters;
    for (let i = 0; i < droppedLetters.length; i++) {
      if (droppedLetters[i].to === index) {
        this.setState({
          lastDraggedItem: {}
        });
        return false;
      }
    }
    return true;
  }

  handleDrag = (item, index) => {
    //disable all draggable option and stop clock after max. threshold
    if (this.wrongAttempt === wrongAttemptThreshold) {
      return false;
    }
    const droppedLetters = this.state.droppedLetters;
    for (let i = 0; i < droppedLetters.length; i++) {
      if (droppedLetters[i].from === index) {
        return false;
      }
    }
    return true;
  }

  toggleSound = () => {
    this.resetSoundSystem();
    this.setState({ soundStatus: !this.state.soundStatus });
  }

  render() {
    const { droppedLetters, notification, soundStatus } = this.state;
    const gameStopped = !(this.props.gameStatus === GameStatus.STARTED || this.props.gameStatus === GameStatus.INPROGRESS);

    return (
      <div className="gameboard">
        <Audio
          soundStatus={ soundStatus }
          cheerSound={ this.isWordCorrect }
          tickSound={ !gameStopped }
          gongSound={ this.sound.gong }
          toggleSound={ this.toggleSound }>
        </Audio>

        <Notification notification={ notification }></Notification>

        <Clock 
          isClockTicking={ !gameStopped  }
          stopGame={ this.props.stopGame }
          gameStatus={ this.props.gameStatus }>
        </Clock>

        <CardListContainer
          jumbledWord={ this.jumbledWord }
          onDrag={ this.onDrag }
          handleDrag={ this.handleDrag }
          disableDrag={ gameStopped }>
        </CardListContainer>

        <WordContainer size={ this.validWord.length }
          onDrop={ this.onDrop }
          droppedLetters={ droppedLetters }
          decideDrop={ this.decideDrop }>
          </WordContainer>

          <Result
            showResult={ gameStopped }
            resetGame={ this.props.resetGame }
            isWordCorrect={ this.isWordCorrect }>
          </Result>
      </div>
    );
  }
}

export default Gameboard;
