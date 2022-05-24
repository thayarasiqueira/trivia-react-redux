import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPlayerAction } from '../redux/actions';
import logo from '../trivia.png';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
      isAble: true,
    };
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value },
      () => {
        this.buttonChange();
      });
  };

  buttonChange = () => {
    const { email, name } = this.state;
    const MIN_NAME_LENGTH = 1;

    if (email.includes('@')
      && email.endsWith('.com')
      && name.length >= MIN_NAME_LENGTH) {
      this.setState({ isAble: false });
    } else {
      this.setState({ isAble: true });
    }
  }

  handleClickPlay = () => {
    const { name, email } = this.state;
    const { userLogin, history } = this.props;

    userLogin(name, email);
    history.push('/gameplay');
  }

  render() {
    const { isAble } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <div className="formLoginAll">
            <input
              name="name"
              type="text"
              data-testid="input-player-name"
              placeholder="Nome"
              onChange={ this.handleChange }
            />

            <input
              name="email"
              type="email"
              data-testid="input-gravatar-email"
              placeholder="Email"
              onChange={ this.handleChange }
            />

            <button
              type="button"
              data-testid="btn-play"
              onClick={ this.handleClickPlay }
              disabled={ isAble }
            >
              Play
            </button>

            {/* <button
              type="button"
              data-testid="btn-play"
              onClick={ this.handleClickSett }
            >
              Settings
            </button> */}
          </div>
        </header>
      </div>

    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userLogin: (name, gravatarEmail) => dispatch(addPlayerAction(name, gravatarEmail)),
});

FormLogin.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  userLogin: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
