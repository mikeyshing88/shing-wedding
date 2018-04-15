/**
 * Save state into localStorage
 * @param  {[type]} state State key
 */
export default (state, stateKey = 'state') => {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem(stateKey, serialisedState);
  } catch (err) {
    // fail silently
  }
};
