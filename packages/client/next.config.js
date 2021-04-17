//@ts-nocheck
const path = require('path');

module.exports = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  webpack: function (config, { dev }) {
    config.resolve.alias = {
      ...config.resolve.alias,
      test: './test',
      components: path.resolve(__dirname, 'components/'),
      layouts: './Layouts',
      types: './types',
      lib: './lib',
      util: './utilities',
      styles: './styles',
      // public: './public',
      // '@common': './node_modules/@ospc/common/src',
    };
    config.stats = {
      ...config.stats,
      all: false,
    };

    return config;
  },
};
