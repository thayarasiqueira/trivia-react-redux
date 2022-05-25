import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getQuestion } from '../redux/actions';

class Game extends React.Component {
  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch(getQuestion());
  }

  // handleClick = () => {

  // }

  render() {
    // const { questions } = this.props;
    return (
      <div>
        <h1 data-testid="game-title">GAME</h1>
        <button
          type="button"
          // onClick={ this.handleClick }
        >
          Busca Perguntas
        </button>

        {/* { !questions ? (
          <h1>Erro</h1>
        ) : (
          questions.map((ele) => ele.retults.type)
        )} */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.question.question,
});

Game.propTypes = {
  // questions: PropTypes.shape.isRequired,
  // addQuest: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Game);
