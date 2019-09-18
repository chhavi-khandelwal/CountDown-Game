import React from 'react';
import './result.scss';

class Result extends React.Component {

  resetGame = () => this.props.resetGame()

  render() {
    const { showResult, isWordCorrect } = this.props;
    return (
      <div className={ showResult ? 'result-container' : 'hide' }>
        <span className={ 'status--mark ' +  (isWordCorrect ? ' tick--success ' : ' tick--failure') }></span>

        <button
          onClick={ this.resetGame }
          className={ 'button--primary ' + (isWordCorrect ? 'button--success' : 'button--failure')}>
          { isWordCorrect ? 'Next' : 'Try Again' }
        </button>
      </div>
    );
  }
}

export default Result;
