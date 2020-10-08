module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: ['airbnb-base'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    chrome: true,
    firebase: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {},
};
