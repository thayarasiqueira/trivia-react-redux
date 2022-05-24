import React from 'react';

class FormLogin extends React.Component {
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

  render() {
    const { isAble } = this.state;

    return (
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

        <button
          type="button"
          data-testid="btn-play"
          onClick={ this.handleClickSett }
        >
          Settings
        </button>

      </div>
    );
  }
}

export default FormLogin;
