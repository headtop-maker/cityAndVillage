module.exports = {
  root: true,
  plugins: ['react', 'react-native'],
  extends: [
    '@react-native',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'no-console': 'warn',
    'jsx-quotes': 'off',
  },
};
