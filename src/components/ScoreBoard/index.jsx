import React from 'react';
import './scoreBoard.scss';
import { wrongAttemptThreshold } from '../../enums/constants';

const ScoreBoard = props => {
    const { score, wrongAttempts } = props;
    //attempts left
    const getAttemptsLeft = () => {
      return wrongAttemptThreshold - wrongAttempts;
    }

    return (
      <ul className="score-board">
        <li className="chances-board">Chances Left: { getAttemptsLeft() }</li>
        <li>Score: { score }</li>
      </ul>
    );
}

export default ScoreBoard;
