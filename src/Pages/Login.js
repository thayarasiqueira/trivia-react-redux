import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addPlayerAction, getToken } from '../redux/actions';
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

  handleClickPlay = async () => {
    const { name, email } = this.state;
    const { userLogin, tokenAction, history } = this.props;
    const token = await tokenAction();
    localStorage.setItem('token', token.token);
    userLogin(name, email);
    history.push('/game');
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

            {/* <Link to='/game'> */}
            <button
              type="button"
              data-testid="btn-play"
              onClick={ this.handleClickPlay }
              disabled={ isAble }
            >
              Play
            </button>
            {/* </Link> */}

            <Link to="/settings">
              <button
                type="button"
                data-testid="btn-settings"
                // onClick={ this.handleClickSett }
              >
                Settings
              </button>
            </Link>
          </div>
        </header>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userLogin: (name, gravatarEmail) => dispatch(addPlayerAction(name, gravatarEmail)),
  tokenAction: () => dispatch(getToken()),
});

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  userLogin: PropTypes.func.isRequired,
  tokenAction: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
