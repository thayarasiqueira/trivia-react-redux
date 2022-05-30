import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  constructor() {
    super();

    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    const arrayOfPlayers = JSON.parse(localStorage.getItem('ranking') || '[]');
    const ranking = arrayOfPlayers.sort((a, b) => b.score - a.score);
    console.log(ranking);
    this.setState({ ranking });
  }

  render() {
    const { ranking } = this.state;

    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>

        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Play again
          </button>
        </Link>
        <section>
          <ul>
            {ranking.map((player, index) => (
              <li key={ index }>
                <span data-testid={ `player-name-${index}` }>{ player.name }</span>
                <span data-testid={ `player-score-${index}` }>{ player.score }</span>
              </li>))}
          </ul>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  assertions: state.player.assertions,
});

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Ranking);
