import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  constructor() {
    super();

    this.state = {
      ranking: [],
    };
  }

  handleButton = () => {
    const { history } = this.props;
    history.push('/');
  }

  componentDidMount = async () => {
    this.seState({ ranking: JSON.parse(localStorage.getItem('ranking')) });
  }

  render() {
    const { ranking } = this.state;

    return (
      <div>
        <h1>Ranking</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.handleButton }
        >
          Voltar ao início
        </button>
        <div>
          { ranking.map((player) => player.name && player.score && player.picture)}

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

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Ranking);
