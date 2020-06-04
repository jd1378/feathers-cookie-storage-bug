module.exports = {
  root: true,
  env: {
    node: true,
    "es6": true,
    jest: true
  },
  parserOptions: {
    "ecmaVersion": 2018,
    ecmaFeatures: {
      impliedStrict: true,
    },
  },
  extends: [
    'prettier',
    'plugin:prettier/recommended',
    "plugin:node/recommended",
  ],
  plugins: [
   'prettier'
  ],
  rules: {
    'no-unused-vars': 'error',
  }
}
