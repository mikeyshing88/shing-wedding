/**
 * Private check status function for fetch usage
 * @param {number} response
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;

  throw error;
}

/**
 * Fetch polyfill with HTTP status error
 * Catching network errors needs to be implemented separately:
 *   utilFetch('./path').then(yourStuff).then(yourOtherStuff).catch((error) => {
 *     // Use `error` here
 *   });
 * @param {string} path File path or URL
 */
export default function utilFetch(path) {
  return fetch(path, { credentials: 'same-origin' }).then(checkStatus);
}
