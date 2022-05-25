import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getQuestion } from '../redux/actions';
import Header from '../componentes/Header';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      counter: 0,
      questionState: [''],
      answers: [''],
      clicked: false,
      fim: false,
    };
  }

  componentDidMount = async () => {
    const { dispatch } = this.props;
    const Logout = await dispatch(getQuestion());
    if (Logout === true) {
      const { history } = this.props;
      history.push('/');
    }
    const { questions } = this.props;
    this.setState({ questionState: questions });
    this.createAnswers(questions[0]);
  }

  createAnswers = (question) => {
    const answersArray = [
      { correct_answer: question.correct_answer },
    ];

    question.incorrect_answers.forEach((ans, index) => {
      answersArray.push({ incorrect_answers: ans, index });
    });

    const RANDOM_CONST = 0.5;
    const randomAnsArray = answersArray.sort(() => Math.random() - RANDOM_CONST);
    this.setState({ answers: [...randomAnsArray] });
  }

  handleAnsBtn = () => {
    this.setState({ clicked: true });
    const { counter } = this.state;
    console.log('Contador', counter);
  }

  handleNextBtn = () => {
    const { counter } = this.state;
    const plus = Number(counter) + 1;
    console.log('Contador', counter, 'Plus', plus);
    const MAX_ANSWERS = 4;
    if (counter < MAX_ANSWERS) {
      const { questions } = this.props;
      this.setState({ counter: plus, clicked: false });
      this.createAnswers(questions[Number(counter)]);
    } else {
      const { history } = this.props;
      history.push('/feedback');
    }
  }

  render() {
    const { counter, questionState, answers, clicked, fim } = this.state;

    return (
      <div className="game-all">
        <Header />
        <h1 data-testid="game-title" className="game-title">IT`S GAME TIME</h1>
        { questionState.length !== 0
          && (
            <div className="questionBox">
              <h3 data-testid="question-category">
                { questionState[counter].category }
              </h3>
              <h2 data-testid="question-text">
                { questionState[counter].question}
              </h2>

              <div className="answersClass">
                { answers.map((ans) => (
                  ans.correct_answer
                    ? (
                      <button
                        data-testid="answer-options"
                        className="correct-answer"
                        type="button"
                        onClick={ this.handleAnsBtn }
                      >
                        <p data-testid="correct-answer">
                          { ans.correct_answer }
                        </p>
                      </button>
                    )
                    : (
                      <button
                        data-testid="answer-options"
                        className="incorrect-answer"
                        type="button"
                        onClick={ this.handleAnsBtn }
                        key={ ans.index }
                      >
                        <p data-testid={ `wrong-answer-${ans.index}` }>
                          { ans.incorrect_answers }
                        </p>
                      </button>
                    )
                ))}
              </div>
            </div>
          )}

        { (clicked === true) ? (
          <button
            type="button"
            onClick={ this.handleNextBtn }
            data-testid="btn-next"
          >
            Next
          </button>
        ) : (
          <p className="nada">Nada</p>
        )}

        { (fim === true) ? (
          <h2>ACABOU OTÁRIO</h2>
        ) : (
          <p className="nada">Nada</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.question.results,
  score: state.player.score,
  assertions: state.player.assertions,
});

Game.propTypes = {
  questions: PropTypes.shape.isRequired,
  // score: PropTypes.number.isRequired,
  // assertions: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default connect(mapStateToProps)(Game);
