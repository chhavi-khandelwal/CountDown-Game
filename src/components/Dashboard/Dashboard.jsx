import React from 'react';
import './dashboard.scss';
import Game from '../Game/Game.jsx';


class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      startGame: false
    }
  }

  onStart = () => {
    this.setState({ startGame: true });
  }

  render() {
    const { startGame } = this.state;
    return (
      <div className={ 'dashboard ' + (startGame ? '' : ' welcome-page') }>
        <button
          onClick={ this.onStart }
          className={ startGame ? ' hide' : ' button--primary' }>START GAME</button>
        <Game startGame={ startGame }></Game>
      </div>
      
    );
  }
}

export default Dashboard;
