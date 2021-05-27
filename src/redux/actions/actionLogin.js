import { LOGIN, LOGOUT } from './types';

const userLogin = (userId) => ({
  type: LOGIN,
  payload: userId,
});

const userLogout = () => ({
  type: LOGOUT,
});

export default { userLogin, userLogout };
