import { signify } from 'react-signify';

export const sIsLoggedIn = signify(
    new Date(localStorage.getItem('userDateToken')?.split('-')).getTime() > new Date().getTime(),
);
export const sIsAdmin = signify(!!JSON.parse(localStorage.getItem('currentStaffData')).type);
// export const sIsAdmin = signify(true);
