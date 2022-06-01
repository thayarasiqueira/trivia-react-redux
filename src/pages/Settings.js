import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../componentes/Header';

class Settings extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <h1 data-testid="settings-title">Settings</h1>
        <h2>Não tem configuração nenhuma</h2>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
            className="btn-play-again"
          >
            Voltar ao início
          </button>
        </Link>
      </div>

    );
  }
}

export default Settings;
