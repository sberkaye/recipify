// test authReducer to see if it reacts related actions properly
import authReducer from '../reducers/authReducer';
import { LOGIN } from '../actions/types';

describe('handles login actions', () => {
  test('handles login', () => {
    const action = {
      type: LOGIN,
      payload: true,
    };
    const newState = authReducer({}, action);
    expect(newState).toEqual({ loggedIn: true });
  });
  test('handles logout', () => {
    const action = {
      type: LOGIN,
      payload: false,
    };
    const newState = authReducer({}, action);
    expect(newState).toEqual({ loggedIn: false });
  });
});
