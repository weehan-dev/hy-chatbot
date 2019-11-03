module.exports = {
  env: {
    es6: true,
    node: true,
    mocha: true
  },
  extends: ['airbnb-base'],

  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'comma-dangle': 'off',
    'no-unused-vars': 'off',
    'no-console': 'off'
  }
};
