// test authReducer to see if it reacts related actions properly
import authReducer from '../reducers/authReducer';
import { LOGIN, LOGOUT } from '../actions/types';

describe('handles login actions', () => {
  test('handles login', () => {
    const action = {
      type: LOGIN,
      payload: '1',
    };
    const newState = authReducer({}, action);
    expect(newState).toEqual({ loggedIn: true, userId: '1' });
  });
  test('handles logout', () => {
    const action = {
      type: LOGOUT,
    };
    const newState = authReducer({}, action);
    expect(newState).toEqual({ loggedIn: false, userId: null });
  });
});
