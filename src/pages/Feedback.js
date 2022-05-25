import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Feedback extends React.Component {
  constructor() {
    super();

    this.state = {
      urlImg: '',
    };
  }

  componentDidMount = async () => {
    const { gravatarEmail } = this.props;
    const urlImg = await md5(gravatarEmail).toString();
    this.setState({ urlImg });
    // console.log(urlImg);
  }

  render() {
    const { name, score } = this.props;
    const { urlImg } = this.state;

    return (
      <div className="headerFBAll">
        <header>
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${urlImg}` }
            alt="Imagem do Usuário"
          />
          <h2 data-testid="header-player-name">{ name }</h2>
          <h2 data-testid="header-score">{ score }</h2>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
});

Feedback.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
