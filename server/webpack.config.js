const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  entry: './app.js',
  output: {
    path: path.resolve(__dirname, 'bin'),
    filename: 'app.js',
    library: 'app',
    libraryTarget: 'umd',
  },
};
