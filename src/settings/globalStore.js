import { signify } from 'react-signify';

export const sIsLoggedIn = signify(!!localStorage.getItem('userToken'));
export const sIsAdmin = signify(!!JSON.parse(localStorage.getItem('userToken'))?.type);
