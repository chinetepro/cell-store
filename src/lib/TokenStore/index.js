export const KEY_ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKKEN || '__access_token__';

export const setAccessToken = token => localStorage.setItem(KEY_ACCESS_TOKEN, token);

export const getAccessToken = () => localStorage.getItem(KEY_ACCESS_TOKEN);

export const clearAccessToken = () => localStorage.removeItem(KEY_ACCESS_TOKEN);