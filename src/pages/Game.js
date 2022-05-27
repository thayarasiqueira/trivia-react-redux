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
      correct: 'black',
      incorrect: 'black',
      timeOut: false,
      clicked: false,
      fim: false,
      timer: 30,
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
    this.handleTimer();
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

  handleColor = () => {
    this.setState({
      correct: 'solid rgb(6, 240, 15) 3px',
      incorrect: 'solid red 3px',
    });
  }

  handleTimer = () => {
    const INTERVAL = 1000;
    const TIME_OUT = 0;
    this.setState({ timer: 30 });

    const countdown = setInterval(() => {
      const { clicked } = this.state;
      this.setState((prevState) => {
        if (clicked) {
          clearInterval(countdown);
        } else {
          return {
            timer: prevState.timer - 1,
          };
        }
      }, () => {
        const { timer: seconds } = this.state;

        if (seconds === TIME_OUT) {
          clearInterval(countdown);
          this.setState({ timeOut: true, clicked: true });
        }
      });
    }, INTERVAL);
  }

  handleAnsBtn = () => {
    this.setState({ clicked: true });
  }

  handleNextBtn = () => {
    const { counter } = this.state;
    const plus = Number(counter) + 1;
    const MAX_ANSWERS = 4;
    if (counter < MAX_ANSWERS) {
      const { questions } = this.props;
      this.setState({
        counter: plus,
        clicked: false,
        correct: 'solid black 1px',
        incorrect: 'solid black 1px',
        timeOut: false,
      });
      this.createAnswers(questions[Number(counter)]);
    } else {
      const { history } = this.props;
      history.push('/feedback');
    }
    this.handleTimer();
  }

  render() {
    const { counter, questionState, answers, clicked,
      fim, timeOut, incorrect, correct, timer } = this.state;
    return (
      <div className="game-all">
        <Header />
        <h1 data-testid="game-title" className="game-title">IT`S GAME TIME</h1>
        <Timer
          timer={ timer }
        />
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
                        style={ { border: [correct] } }
                        className="correct-answer"
                        type="button"
                        onClick={ () => {
                          this.handleColor();
                          this.handleAnsBtn();
                        } }
                        disabled={ timeOut }
                      >
                        <p>
                          { ans.correct_answer }
                        </p>
                      </button>
                    )
                    : (
                      <button
                        data-testid={ `wrong-answer-${ans.index}` }
                        style={ { border: [incorrect] } }
                        className="incorrect-answer"
                        type="button"
                        onClick={ () => {
                          this.handleColor();
                          this.handleAnsBtn();
                        } }
                        disabled={ timeOut }
                        key={ ans.index }
                      >
                        <p>
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
