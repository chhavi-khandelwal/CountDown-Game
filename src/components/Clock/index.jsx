import React from 'react';
import './clock.scss';
import { GameStatus } from '../../enums/GameStatus';
import { clockTimer } from '../../enums/constants';

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.counter = 0;
    this.state = { time: '0:00' };
  }

  resetClock() {
    this.counter = 0;
    this.setState({ time: '0:00' });
  }

  componentWillUnmount() { // delete the interval just before component is removed
    this.stopClockAndGame('FAIL');
  }

  stopClockAndGame = (status) => {
    clearInterval(this.interval);
    this.props.stopGame(status);
  }

  componentDidMount() {
    this.updateDigitalTime();
  }

  componentDidUpdate() {
    if (!this.props.isClockTicking && this.state.time !== '0:00') {
      clearInterval(this.interval);
      this.resetClock();
    }
    if (this.props.gameStatus === GameStatus.STARTED) {
      this.resetClock()
      this.updateDigitalTime();
    }
  }

  updateDigitalTime() {
    if (!this.props.isClockTicking) { return; }

    this.interval = setInterval(() => {
      this.counter++;
      const counter = this.counter;
      const timeString = (this.counter > 9 ? '0:' : '0:0') + this.counter;

      if (counter >= clockTimer) { this.stopClockAndGame('FAIL'); }
      this.setState({ time: timeString });
    }, 1 * 1000);
  }

  render () {
    const { isClockTicking } = this.props;
    return (
      <div className="clock__holder">
        <div className="clock">
          <div className="clock__bell"></div>
          <div className="clock__bell clock__bell--right"></div>
          <div className="clock__tick--top clock__tick"></div>
          <div className="clock__tick--center">
            <div className="clock__tick--left clock__tick"></div>
            <div className={ 'clock__needle ' + (isClockTicking ? 'tick' : '') }></div>  
            <div className="clock__tick--right clock__tick"></div>
          </div>
          <div className="clock__tick--bottom clock__tick"></div>
          <div className="clock__leg"></div>

        </div>
        <div className={ (isClockTicking ? 'animate ' : '') + 'clock--digital' }>{ this.state.time }</div>
      </div>
    );
  }
}

export default Clock;
