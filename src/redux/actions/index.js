export const ADD_PLAYER = 'ADD_PLAYER';
export const ADD_POINTS = 'ADD_POINTS';
export const GET_TOKEN = 'GET_TOKEN';

export function addPlayerAction(name, gravatarEmail) {
  return {
    type: ADD_PLAYER,
    payload: {
      name,
      gravatarEmail,
    },
  };
}

export function addScoreAction(score, assertions) {
  return {
    type: ADD_POINTS,
    payload: {
      score,
      assertions,
    },
  };
}

export const getToken = () => async () => {
  const API_URL = 'https://opentdb.com/api_token.php?command=request';
  const promise = await fetch(API_URL);
  const result = await promise.json();
  return result;
};
