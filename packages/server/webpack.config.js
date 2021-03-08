const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
module.exports = function (options) {
  return {
    ...options,
    mode: 'development',
    entry: ['webpack/hot/poll?100', options.entry],
    externals: [
      nodeExternals({
        allowlist: ['webpack/hot/poll?100'],
        modulesDir: path.resolve(__dirname, '../../node_modules'),
      }),
    ],
    module: {
      rules: [
        {
          test: /\.graphql?$/,
          use: 'webpack-graphql-loader',
        },

        {
          test: /\.(ts|tsx)?$/,
          loader: 'ts-loader',
          options: { allowTsInNodeModules: true },
        },
      ],
    },
    plugins: [...options.plugins, new webpack.HotModuleReplacementPlugin()],
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      symlinks: false,
      alias: {
        users: path.resolve('./src/users/'),
        auth: path.resolve('./src/auth/'),
        subjects: path.resolve('./src/subjects/'),
        utils: path.resolve('./src/utils/'),
        forum: path.resolve('./src/forum/'),
        departments: path.resolve('./src/departments/'),
        coach: path.resolve('./src/coach/'),
        '@common': path.resolve('./node_modules/@ospc/common/src'),
      },
    },
    // output: {
    //   path: path.join(__dirname, 'dist'),
    //   filename: 'main.js',
    // },
  };
};
