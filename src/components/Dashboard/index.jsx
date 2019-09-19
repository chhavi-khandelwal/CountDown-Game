import React from 'react';
import './dashboard.scss';
import Game from '../Game';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { startGame: false };
  }

  onStart = () => {
    this.setState({ startGame: true });
  }

  render() {
    const { startGame } = this.state;
    return (
      <div className="dashboard">
        <h3 className={ startGame ? ' hang' : '' }>COUNTDOWN BEGINS!</h3>
        <div className={ 'welcome-page ' + (startGame ? ' hide' : '') }>
          <div>How to play?</div>
          <div className="instructions">
            <p>1. Create the word from 9 alphabets shown on the screen.</p>
            <p>2. You only have a minute to build the word.</p>
            <p>3. Turn On sound for better experience.</p>
            <p>3. Each correct answer adds 1 score to the scoreboard.</p>
          </div>
            
          <button
            onClick={ this.onStart }
            className={ startGame ? ' hide' : ' button--primary' }>START GAME</button>
        </div>
        
        <Game startGame={ startGame }></Game>
      </div>
      
    );
  }
}

export default Dashboard;
