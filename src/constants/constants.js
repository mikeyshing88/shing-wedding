export const HOSTNAME = (typeof window !== 'undefined') ? window.location.hostname : '';
export const IS_LOCAL = (HOSTNAME === 'localhost');
