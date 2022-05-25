export const ADD_PLAYER = 'ADD_PLAYER';
export const ADD_POINTS = 'ADD_POINTS';
export const GET_TOKEN = 'GET_TOKEN';
export const ADD_QUESTION = 'ADD_QUESTION';

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

export const addQuestionAction = (obj) => ({
  type: ADD_QUESTION,
  payload: { obj },
});

export const getQuestion = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  const promise = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const result = await promise.json();
  dispatch(addQuestionAction(result));
};
