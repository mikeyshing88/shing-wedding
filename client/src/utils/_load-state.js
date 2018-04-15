/**
 * Load state from localStorage
 * @param  {String} stateKey State key
 * @return {Object} State
 */
export default (stateKey = 'state') => {
  try {
    const serialisedState = localStorage.getItem(stateKey);
    if (serialisedState === null) {
      return undefined;
    }
    return JSON.parse(serialisedState);
  } catch (err) {
    return undefined;
  }
};
