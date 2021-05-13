import { LOGIN } from '../actions/types';

const INITIAL_STATE = {
  loggedIn: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loggedIn: action.payload,
      };
    default:
      return state;
  }
};
