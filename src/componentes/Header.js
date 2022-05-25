import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      urlImg: '',
    };
  }

  componentDidMount = async () => {
    const { email } = this.props;
    const urlImg = await md5(email).toString();
    this.setState({ urlImg });
    // console.log(urlImg);
  }

  render() {
    const { name, assertions, score } = this.props;
    const { urlImg } = this.state;

    return (
      <div className="header-all">
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${urlImg}` }
          alt="Imagem do Usuário"
        />
        <h3 data-testid="header-player-name">{ `Usuário: ${name}` }</h3>
        <h3>{ `Número de acertos: ${assertions}` }</h3>
        <h3 data-testid="header-score">{ `Pontuação: ${score}` }</h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  assertions: state.player.assertions,
  email: state.player.gravatarEmail,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
