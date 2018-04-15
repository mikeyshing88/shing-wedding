import _clone from 'lodash/clone';
import _transform from 'lodash/transform';
import { cleanPhonePath } from 'common/regex';

export function getDeviceDetailsUrl(params) {
  const raw = _clone(params);

  // @todo validation the object has all params required
  params = _transform(params, (result, param, key) => {
    result[key] = String(param);
    return result[key];
  });

  const family = cleanPhonePath(`${params.family}-${params.subFamily}`);
  let returnUrl = `/mobile/phones/${params.vendor}/${family}/`;

  /* if we've been provided the colour and memory then append it to the Url */
  if (params.colour
    && params.colour !== undefined
    && params.storage && params.storage !== undefined) {
    returnUrl += `?colour=${raw.colour}&memory=${params.storage}`;
  }

  return returnUrl.toLowerCase();
}

export function decodeSubFamilyUrl(param) {
  // @todo validation the object has all params required
  param = String(param);
  return param.replace('-', ' ');
}

// url builder
function urlParse(urlObj) {
  const protocol = (urlObj.protocol.length > 0) ? `${urlObj.protocol}://` : '';

  return protocol + urlObj.domain + urlObj.pathname + urlObj.pagename + urlObj.parameters;
}

// to avoid undefined data being inject in the URL
function verifyUrlAttributes(url) {
  return (typeof url !== 'undefined') ? url : '';
}

// get all attributes related to the URL and build it attaching a
// new attribute 'url' into the object
export function setNavigationURL(navData) {
  navData.forEach((item) => {
    const url = urlParse({
      protocol: verifyUrlAttributes(item.protocol),
      domain: verifyUrlAttributes(item.domain),
      pathname: verifyUrlAttributes(item.pathname),
      pagename: verifyUrlAttributes(item.pagename),
      parameters: verifyUrlAttributes(item.parameters)
    });

    if (item.sub_nav) {
      item.sub_nav_items.forEach((subItem) => {
        subItem.url = urlParse({
          protocol: verifyUrlAttributes(subItem.protocol),
          domain: verifyUrlAttributes(subItem.domain),
          pathname: verifyUrlAttributes(subItem.pathname),
          pagename: verifyUrlAttributes(subItem.pagename),
          parameters: verifyUrlAttributes(subItem.parameters)
        });
      });
    }

    item.url = url;
  });
}

// Substracts the last slash from URL if it's an
// ending slash e.g. last character of path
export function substractUrlEndingSlash(url) {
  const numSlashLastIndex = url.lastIndexOf('/');

  if (numSlashLastIndex === url.length - 1) {
    // Early return URL with no ending slash
    return url.substr(0, numSlashLastIndex);
  }

  // Returns original URL
  return url;
}

export function parseUrlParameters(url) {
  return {
    baseUrl: url.split('?')[0],
    originalUrlParams: url.split('?')[1]
      .split('&')
      .reduce((prev, current) => {
        const [k, v] = current.split('=');
        prev[k] = v;
        return prev;
      }, {})
  };
}

export function buildUrlFromParameterArray(baseUrl, parameters) {
  const url =
    Object.keys(parameters).reduce((prev, current, index) => {
      const value = parameters[current];
      prev += `${(index === 0 ? '?' : '&')}${current}=${value}`;
      return prev;
    }, baseUrl);

  return url;
}
