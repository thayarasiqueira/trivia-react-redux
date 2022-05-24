export const ADD_PLAYER = 'ADD_PLAYER';
export const ADD_POINTS = 'ADD_POINTS';

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
