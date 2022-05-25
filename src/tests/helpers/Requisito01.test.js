import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, fireEvent } from '@testing-library/react';
import Login from '../../pages/Login';
import Game from '../../pages/Game';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import initialStore1 from './data';

describe('Requisito 04 - Testando a Pagina de Login', () => {
  const historyMock = { push: jest.fn() } 

  // jest.mock('react-router-dom', () => ({
  //   ...jest.requireActual('react-router-dom'),
  //   useHistory: () => ({
  //     push: mockHistoryPush,
  //   }),
  // }));

  it('00 - Testando se o componente se chama Login e esta na pasta "src/Pages"', () => {
    const { container } = renderWithRouterAndRedux(<Login />, '/', {});
    expect(container).toBeDefined();
  })

  it('01 - Testando existencia dos inputs e botões', () => {
    renderWithRouterAndRedux(<Login />);

    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const btnPlay = screen.getByTestId('btn-play');
    const btnSettings = screen.getByTestId('btn-settings');

    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(btnPlay).toBeInTheDocument();
    expect(btnSettings).toBeInTheDocument();
    expect(btnPlay).to
  })

  it('02 - Testando se o botão de Play começa desativado e só é ativado com nome e email válidos', () => {
    renderWithRouterAndRedux(<Login />);

    const btnPlay = screen.getByTestId('btn-play');
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');

    expect(btnPlay).toBeDisabled();

    userEvent.type(inputEmail, 'test@test.com');
    userEvent.type(inputName, 'teste');

    expect(btnPlay).not.toBeDisabled();

    userEvent.type(inputEmail, 'asneira');
    userEvent.type(inputName, '');

    expect(btnPlay).toBeDisabled();
  })

  it('03 - Testando funcionalidade do botão Play no Redux', () => {
    const { store } = renderWithRouterAndRedux(<Login />);

    const NAME_TEST = 'test';
    const EMAIL_TEST = 'test@test.com';
    const btnPlay = screen.getByTestId('btn-play');
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');

    userEvent.type(inputEmail, EMAIL_TEST);
    userEvent.type(inputName, NAME_TEST);
    fireEvent.click(btnPlay);

    // const mockUserLogin = jest.()

    expect(store.getState().player.player).toBe(initialStore1);
  })

  it('04 - Testando funcionalidade do botão Play - Push', () => {
    renderWithRouterAndRedux(<Login />);

    const btnPlay = screen.getByTestId('btn-play');
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');

    userEvent.type(inputEmail, 'test@test.com');
    userEvent.type(inputName, 'teste');
    expect(btnPlay).not.toBeDisabled();
    userEvent.click(btnPlay);

    // expect(mockHistoryPush).toHaveBeenCalledWith('/game');
    // expect(history.location.pathname).toBe('/game');

    expect(historyMock.push.mock.calls[0]).toEqual([
      {
        pathname: "/game", // URL
      },
    ]);
  })

  it('05 - Testando funcionalidade do botão Settings - Push', () => {
    const { history } = renderWithRouterAndRedux(<Login />);

    const btnSettings = screen.getByTestId('btn-settings');

    expect(btnSettings).not.toBeDisabled;
    fireEvent.click(btnSettings);

    expect(history.location.pathname).toBe('/settings');
  })
});
