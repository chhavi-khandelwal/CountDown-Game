import React from 'react';
import './result.scss';
import { btnText } from '../../enums/constants';

const Result = props => {
  const { isCorrect, resetGame } = props;

  return (
    <div className="result-container">
      <span className={ 'status--mark ' +  (isCorrect ? ' tick--success ' : ' tick--failure') }></span>
      <button
        onClick={ resetGame }
        className={ 'button--primary ' + (isCorrect ? 'button--success' : 'button--failure') }>
        { isCorrect ? btnText.NEXT : btnText.TRYAGAIN }
      </button>
    </div>
  );
}

export default Result;
