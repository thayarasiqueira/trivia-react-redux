export const ADD_PLAYER = 'ADD_PLAYER';

export function addPlayerAction(name, assertion, score, gravatarEmail) {
  return {
    type: ADD_PLAYER,
    payload: {
      name,
      score,
      assertion,
      gravatarEmail,
    },
  };
}
