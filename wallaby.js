// working setup for mocha tests
const webpackConfig = require('./build/webpack.base.conf.js');
const wallabyWebpack = require('wallaby-webpack');

module.exports = function(wallaby) {
  webpackConfig.resolve.alias = { '@': require('path').join(wallaby.projectCacheDir, 'src') };
  webpackConfig.externals = { vue: 'Vue' };
  webpackConfig.module.rules.find(r => r.loader === 'vue-loader').options.loaders.js = '';

  const wallabyPostprocessor = wallabyWebpack(webpackConfig);

  return {
    files: [
      { pattern: 'node_modules/vue/dist/vue.js', instrument: false },
      { pattern: 'node_modules/babel-polyfill/dist/polyfill.js', instrument: false },
      // {pattern: 'node_modules/babel-polyfill/browser.js', instrument: false},
      { pattern: 'src/**/*.*', load: false },
      { pattern: 'src/**/*.test.js', load: false, ignore: true },
    ],

    // env: {
    //   type: 'browser'
    // },

    tests: [
      { pattern: 'test/**/*.spec.js', load: false }, // tests from https://github.com/ChangJoo-Park/vue-wallaby-webpack-template
      { pattern: 'src/**/*.test.js', load: false },
    ],

    postprocessor: wallabyPostprocessor,

    setup: function() {
      Vue.config.errorHandler = function(err) {
        throw err;
      };
      Vue.config.productionTip = false;

      window.__moduleBundler.loadTests();
    },

    // testFramework: 'jest',

    hints: {
      ignoreCoverage: /ignore coverage/,
    },

    compilers: {
      '**/*.js': wallaby.compilers.babel(),
      '**/*.vue': require('wallaby-vue-compiler')(wallaby.compilers.babel({})),
    },

    debug: true,

    screenshot_on_failure: true,
  };
};
