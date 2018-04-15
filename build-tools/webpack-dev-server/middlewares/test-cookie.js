const fs = require('fs');
const path = require('path');
const url = require('url');
const chalk = require('chalk');

/**
 * Clean non ascii chars from string
 * @param input
 * @return {string}
 */
function cleanNonAsciChars(input) {
  let output = '';
  for (let i=0; i<input.length; i++) {
    if (input.charCodeAt(i) <= 127) {
      output += input.charAt(i);
    }
  }
  return output;
}

/**
 * Encode cookie, before setting it
 * @param data
 * @return {string|*}
 */
function encodeCookie(data) {
  data = cleanNonAsciChars(data);
  return data;
}


/**
 * Express midddleware
 * - set the PC_DATA cookie from json file
 * - used in e2e tests
 * @param req
 * @param res
 * @param next
 */
module.exports = function (req, res, next) {

  let content = null;

  // get url params query
  const query = url.parse(req.url, true).query;

  // if no query.cookie, skip
  if (!query.cookie) {
    next();
    return;
  }

  try {
    // get cookie json file content by query.cookie
    content = fs.readFileSync(path.resolve(process.cwd(), `src/assets/json/test-data/${query.cookie}.json`), 'utf-8');
  } catch (err) {
    console.log(chalk.white.bgRed.bold(`[?cookie=${query.cookie}] error. This cookie name/path doesn't exists`));
    console.log(err.message);
  }

  // set PC_DATA cookie
  res.cookie('PC_DATA', JSON.stringify(JSON.parse(content)), {
    maxAge: 900000,
    httpOnly: false,
    encode: encodeCookie,
    signed: false,
  });
  next();
};
