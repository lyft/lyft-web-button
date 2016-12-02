module.exports = {
  extends: 'airbnb-es5',
  parserOptions: {
    sourceType: 'script'
  },
  rules: {
    'camelcase': 'off',
    'consistent-return': 'off',
    'func-names': 'off',
    'indent': ['error', 2],
    'max-len': ['error', { 'code': 120, 'tabWidth': 2, 'ignoreUrls': true }],
    'no-alert': 2,
    'no-cond-assign': ['error', 'except-parens'],
    'no-else-return': 'off',
    'no-lonely-if': 'error',
    'no-param-reassign': 'off',
    'no-undefined': 'off',
    'no-use-before-define': ['error', { functions: false }],
    'valid-jsdoc': 'off'
  }
};
