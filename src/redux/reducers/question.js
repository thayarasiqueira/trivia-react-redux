import { ADD_QUESTION } from '../actions';

const INITIAL_STATE = {};

function question(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_QUESTION:
    return { ...state, question: action.payload };
  default:
    return state;
  }
}

export default question;
