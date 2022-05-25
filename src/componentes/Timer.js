import React, { Component } from 'react';

class Timer extends Component {
  constructor() {
    super();

    this.state = {
      timer: 30,
    };
  }

  componentDidMount() {
    const INTERVAL = 1000;

    const countdown = setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }), () => {
        const { timer } = this.state;
        const { timeIsOut } = this.props;

        if (timer === 0) {
          clearInterval(countdown);
          timeIsOut(true);
        }
      });
    }, INTERVAL);
  }

  render() {
    const { timer } = this.state;

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
  timeIsOut: PropTypes.func.isRequired,
};

export default Timer;
