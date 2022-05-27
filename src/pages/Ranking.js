import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  // constructor() {
  //   super();

  //   this.state = {
  //     ranking: [],
  //   };
  // }

  // // handleButton = () => {
  // //   const { history } = this.props;
  // //   history.push('/');
  // // };

  // componentDidMount = async () => {
  //   this.seState({ ranking: JSON.parse(localStorage.getItem('ranking')) });
  // };

  render() {
    // const { ranking } = this.state;

    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>

        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
            // onClick={ this.handleButton }
          >
            Play again
          </button>
        </Link>
        {/* <div>
          {ranking.map((player, index) => (
            <div key={ player }>
              <p data-testid={ `player-name-${index}` }>
                {player.name}
              </p>
              <p data-testid={ `player-score-${index}` }>
                {player.score}
              </p>
            </div>
          ))}
        </div> */}
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
