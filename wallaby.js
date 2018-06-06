// working setup for mocha tests
const webpackConfig = require('./build/webpack.base.conf.js');
const wallabyWebpack = require('wallaby-webpack');

module.exports = function(wallaby) {
  webpackConfig.resolve.alias = {
    '@': require('path').join(wallaby.projectCacheDir, 'src'),
  };
  webpackConfig.externals = { vue: 'Vue' };
  webpackConfig.module.rules.find(
    r => r.loader === 'vue-loader',
  ).options.loaders.js =
    '';

  return {
    files: ['src/**/*', 'test/unit/*.js', 'package.json'],

    env: {
      type: 'node',
      runner: 'node',
    },

    tests: ['test/**/*.spec.js'],

    setup: function(wallaby) {
      const jestConfig =
        require('./package').jest || require('./test/unit/jest.conf.js');
      jestConfig.transform = {};
      wallaby.testFramework.configure(jestConfig);
    },

    testFramework: 'jest',

    hints: {
      ignoreCoverage: /ignore coverage/,
    },

    compilers: {
      '**/*.js': wallaby.compilers.babel(),
      '**/*.vue': require('wallaby-vue-compiler')(wallaby.compilers.babel({})),
    },

    preprocessors: {
      '**/*.vue': file => require('vue-jest').process(file.content, file.path),
    },

    debug: true,

    screenshot_on_failure: true,
  };
};
