import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, fireEvent } from '@testing-library/react';
import Login from '../../pages/Login';
import Game from '../../pages/Game';
import Feedback from '../../pages/Feedback';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import {initialStore2, initialStore3, initialStore4 }  from './data';

describe('Requisito 04 - Testando a Pagina de Login', () => {
  const initial1 = initialStore2;
  const initial2 = initialStore3;
  const initial3 = initialStore4;

  it('00 - Testando se o componente se chama Login e esta na pasta "src/Pages"', () => {
    const { container } = renderWithRouterAndRedux(<Login />, '/', {});
    expect(container).toBeDefined();
  })

  it('01 - Testanto o Header', () => {
    const { store } = renderWithRouterAndRedux(<Feedback />, '/feedback', initial1);

    const nameHeader = screen.getByTestId('header-player-name');
    const scoreHeader = screen.getByTestId('header-score');
    const imgHeader = screen.getByTestId('header-profile-picture');

    expect(nameHeader).toBeInTheDocument();
    expect(scoreHeader).toBeInTheDocument();
    expect(imgHeader).toBeInTheDocument();

    expect(nameHeader).toContainHTML(store.getState().player.name);
    // expect(imgHeader.scr).toContainHTML('https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e');
    expect(scoreHeader).toContainHTML(store.getState().player.score);
  })

  it('02 - Testanto o se tiver assertion menor do que 3', () => {
    const { store } = renderWithRouterAndRedux(<Feedback />, initial1, '/feedback');

    // debug();

    const scoreText = screen.getByTestId('feedback-total-score');
    const assertionText = screen.getByTestId('feedback-total-question');
    const feedbackMsg = screen.getByTestId('feedback-text');

    expect(scoreText).toContainHTML(store.getState().player.score);
    expect(assertionText).toContainHTML(store.getState().player.assertions);
    expect(feedbackMsg).toContainHTML('Could be better...'); 
  })

  it('03 - Testanto o se tiver assertion igual a 3', () => {
    const { store } = renderWithRouterAndRedux(<Feedback />, initial2, '/feedback');

    const scoreText = screen.getByTestId('feedback-total-score');
    const assertionText = screen.getByTestId('feedback-total-question');
    const feedbackMsg = screen.getByTestId('feedback-text');

    expect(scoreText).toContainHTML(store.getState().player.score);
    expect(assertionText).toContainHTML(store.getState().player.assertions);
    expect(feedbackMsg).toContainHTML('Well Done!'); 
  })

  it('04 - Testanto o se tiver assertion maior do que 3', () => {
    const { store } = renderWithRouterAndRedux(<Feedback />, initial3, '/feedback');

    const scoreText = screen.getByTestId('feedback-total-score');
    const assertionText = screen.getByTestId('feedback-total-question');
    const feedbackMsg = screen.getByTestId('feedback-text');

    expect(scoreText).toContainHTML(store.getState().player.score);
    expect(assertionText).toContainHTML(store.getState().player.assertions);
    expect(feedbackMsg).toContainHTML('Well Done!'); 
  })

  it('05 - Testando funcionalidade do botão Play Again', () => {
    const { history } = renderWithRouterAndRedux(<Feedback />);

    const btnPlayAgain = screen.getByTestId('btn-play-again');

    expect(btnPlayAgain).not.toBeDisabled;
    fireEvent.click(btnPlayAgain);

    expect(history.location.pathname).toBe('/');
  })

  it('06 - Testando funcionalidade do botão Raking', () => {
    const { history } = renderWithRouterAndRedux(<Feedback />);

    const btnRanking = screen.getByTestId('btn-ranking');

    expect(btnRanking).not.toBeDisabled;
    fireEvent.click(btnRanking);

    expect(history.location.pathname).toBe('/ranking');
  })
});
