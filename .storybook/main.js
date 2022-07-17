const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-modules-typescript-loader' },
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: '[local]--[hash:base64]',
            },
            sourceMap: true,
          },
        },
        { loader: 'sass-loader' },
      ],
    });

    // Return the altered config
    return config;
  },
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
};