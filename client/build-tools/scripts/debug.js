// Do this as the first thing so that any code reading it knows the right env.
const environment = 'production'
process.env.BABEL_ENV = environment;
process.env.NODE_ENV = environment;

// require node_modules deps
const webpack = require('webpack');

// require local deps
const webpackConfig = require('../webpack-config/webpack.config.dev');

const compiler = webpack(webpackConfig);
compiler.run((err, stats) => {
  console.log('[webpack:build]', stats.toString({
    colors: true,
  }));
});
