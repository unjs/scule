import unjs from "eslint-config-unjs";

export default unjs({
  rules: {
    'unicorn/prefer-string-raw': 'off'
  },
  ignores: [
    './coverage',
    './dist'
  ]
});
