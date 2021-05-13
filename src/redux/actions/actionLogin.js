import { LOGIN } from './types';

const userLogin = () => ({
  type: LOGIN,
  payload: true,
});

const userLogout = () => ({
  type: LOGIN,
  payload: false,
});

export default { userLogin, userLogout };
