import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';

class Feedback extends React.Component {
  constructor() {
    super();

    this.state = {
      urlImg: '',
      feedbackMsg: '',
    };
  }

  componentDidMount = () => {
    const { gravatarEmail } = this.props;
    const urlImg = md5(gravatarEmail).toString();
    this.setState({ urlImg });
    this.changeMsg();
    this.updateRankList();
  }

  updateRankList = () => {
    const { name, score } = this.props;
    const { urlImg } = this.state;

    const newObj = {
      name,
      score,
      urlImg,
    };

    const currList = JSON.parse(localStorage.getItem('ranking') || '[]');
    currList.push(newObj);
    localStorage.setItem('ranking', JSON.stringify(currList));
  }

  changeMsg = () => {
    const { assertions } = this.props;
    const ASSERTIONS = 3;
    if (assertions < ASSERTIONS) {
      this.setState({ feedbackMsg: 'Could be better...' });
    } else {
      this.setState({ feedbackMsg: 'Well Done!' });
    }
  }

  render() {
    const { name, score, assertions } = this.props;
    const { urlImg, feedbackMsg } = this.state;

    return (
      <div className="headerFBAll">
        <header className="header-feedback">
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${urlImg}` }
            alt="Imagem do Usuário"
          />
          <h2 data-testid="header-player-name">{ name }</h2>
          <h2 data-testid="header-score">{ score }</h2>
        </header>

        <div className="feedback-text">
          <h1 data-testid="feedback-text">{ feedbackMsg }</h1>
          <div className="feed-text-int">
            <h3 data-testid="feedback-total-score">{ `Your score: ${score}`}</h3>
            <h3 data-testid="feedback-total-question">{ `Your assertions: ${assertions}` }</h3>
          </div>
        </div>

        <div className="buttons">
          <Link to="/">
            <button
              className="btn-play-again"
              type="button"
              data-testid="btn-play-again"
            >
              Play again
            </button>
          </Link>

          <Link to="/ranking">
            <button
              className="btn-ranking"
              type="button"
              data-testid="btn-ranking"
            >
              Ranking
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
