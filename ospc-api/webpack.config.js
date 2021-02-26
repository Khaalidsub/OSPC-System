const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
module.exports = function (options) {
  return {
    ...options,
    entry: ['webpack/hot/poll?100', options.entry],
    externals: [
      nodeExternals({
        allowlist: ['webpack/hot/poll?100'],
      }),
    ],
    plugins: [...options.plugins, new webpack.HotModuleReplacementPlugin()],
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'main.js',
    },
  };
};
