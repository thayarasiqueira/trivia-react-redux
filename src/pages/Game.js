import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getQuestion } from '../redux/actions';
import Header from '../componentes/Header';
import Timer from '../componentes/Timer';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      counter: 0,
      questionState: [''],
      answers: [''],
      timeOut: false,
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

  handleTimer = (timeOut) => {
    if (timeOut) this.setState({ timeOut });
  }

  render() {
    const { counter, questionState, answers, timeOut } = this.state;

    return (
      <div className="game-all">
        <Header />
        <h1 data-testid="game-title" className="game-title">IT`S GAME TIME</h1>
        <Timer timeIsOut={ this.handleTimer } />
        { questionState.length !== 0
          && (
            <div className="questionBox">
              <h3 data-testid="question-category">
                { questionState[counter].category }
              </h3>
              <h2 data-testid="question-text">
                { questionState[counter].question}
              </h2>

              <div
                className="answersClass"
                data-testid="answer-options"
              >
                { answers.map((ans) => (
                  ans.correct_answer
                    ? (
                      <button
                        data-testid="correct-answer"
                        className="correct-answer"
                        type="button"
                        disabled={ timeOut }
                      >
                        { ans.correct_answer }
                      </button>
                    )
                    : (
                      <button
                        data-testid={ `wrong-answer-${ans.index}` }
                        className="incorrect-answer"
                        type="button"
                        disabled={ timeOut }
                      >
                        { ans.incorrect_answers }
                      </button>
                    )
                ))}
              </div>
            </div>
          )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.question.results,
});

Game.propTypes = {
  questions: PropTypes.shape.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default connect(mapStateToProps)(Game);
