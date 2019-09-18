import React from 'react';
import './scoreBoard.scss';
import { wrongAttemptThreshold } from '../../enums/constants';

const ScoreBoard = props => {
    const { score, wrongAttempts } = props;

    const getChancesLeft = () => {
      return wrongAttemptThreshold - wrongAttempts;
    }

    return (
      <ul className="score-board">
        <li className="chances-board">Chances Left: { getChancesLeft() }</li>
        <li>Score: { score }</li>
      </ul>
    );
}

export default ScoreBoard;
