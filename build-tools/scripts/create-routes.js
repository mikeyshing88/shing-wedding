import path from 'path';
import fs from 'fs-extra';
import to from 'await-to-js';
import chalk from 'chalk';
import config from './config';

/**
 * Reads the index file specified in the config
 * @returns {Promise}
 */
function getIndexFile() {
  console.log(chalk.blue(`Reading build index file: ${config.currentIndexFileName}`));
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname,
      config.distDir,
      config.outputFolder,
      config.currentIndexFileName), {
      encoding: config.encoding
    }, (err, data) => {
      if (err) {
        reject(err);
      }
      console.log(chalk.green(`Index file read correctly: ${config.currentIndexFileName}`));
      resolve(data);
    });
  });
}

/**
 * Writes a new file to the static route
 * @param route
 * @param fileContent
 * @returns {Promise}
 */
async function writeNewFile(route, fileContent) {
  return new Promise((resolve, reject) => {
    const fileDir = path.join(__dirname, config.distDir, route),
      fullPath = path.join(fileDir, config.outputFileName);

    // Checks if the directory exists
    if (!fs.existsSync(fileDir)) {
      console.log(chalk.blue(`Creating new directory: ${fileDir}`));
      fs.mkdirSync(fileDir);
      console.log(chalk.green(`Directory created: ${fileDir}`));
    }
    console.log(chalk.blue(`Writing file: ${fullPath}`));
    fs.writeFile(fullPath, fileContent, ((err) => {
      if (err) {
        reject(err);
      }
      console.log(chalk.green(`New file written at: ${fullPath}`));
      resolve();
    }));
  });
}

/**
 * Main function to export
 * @returns {Promise.<void>}
 */
async function createRoutes() {
  console.log(chalk.yellow('--------------------------'));
  console.log(chalk.yellow('Starting to create routes'));
  console.log(chalk.yellow('--------------------------'));

  const [readErr, indexFile] = await to(getIndexFile());

  if (readErr) {
    console.log(chalk.red(`\nIndex file read error: ${readErr}`));
    return;
  }

  // Create virtual routes for whatever we don't have in the dist folder
  for (let index = 0; index < config.routes.length; index++) {
    const route = config.routes[index];
    const [writeErr] = await to(writeNewFile(route, indexFile));
    if (writeErr) {
      console.log(chalk.red(`Writing new file for route ${route} failed: ${writeErr}`));
      return;
    }
  }

  console.log(chalk.yellow('--------------------------'));
  console.log(chalk.yellow('Routes created correctly'));
  console.log(chalk.yellow('--------------------------'));
}

// Creates the routes
createRoutes();
