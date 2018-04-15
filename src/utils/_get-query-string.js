/**
 * Get the value of a querystring
 * @param  {String} field The field to get the value of
 * @param  {String} url   The URL to get the value from (optional)
 * @return {String}       The field value
 */
export default function getQueryString(field, url = window.location.href) {
  const reg = new RegExp(`[?&]${field}=([^&#]*)`, 'i'),
    results = reg.exec(url);
  return results ? results[1] : null;
}
