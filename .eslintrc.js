module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: 'airbnb',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'linebreak-style': 'off',
    'no-underscore-dangle': 'off',
    'no-plusplus': 'off',
    'no-param-reassign': 'off',
    'no-restricted-syntax': 'off',
    'import/prefer-default-export': 'off',
    'no-bitwise': 'off',
    'max-classes-per-file': ['error', 2],
  },
};
