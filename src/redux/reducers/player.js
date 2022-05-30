import { ADD_PLAYER, ADD_POINTS } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_PLAYER:
    return { ...state, ...action.payload };
  case ADD_POINTS:
    return { ...state, ...action.payload };
  default:
    return state;
  }
}

export default player;
