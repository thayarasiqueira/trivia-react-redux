import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Timer extends Component {
  render() {
    const { timer } = this.props;

    return (
      <div>
        <span className="timer">
          Tempo restante:
          { ` ${timer}` }
        </span>
      </div>
    );
  }
}

Timer.propTypes = {
  timer: PropTypes.number.isRequired,
};

export default Timer;
