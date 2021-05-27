import { LOGIN, LOGOUT } from '../actions/types';

const INITIAL_STATE = {
  loggedIn: null,
  userId: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loggedIn: true,
        userId: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        loggedIn: false,
        userId: null,
      };
    default:
      return state;
  }
};
