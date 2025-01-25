module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    [
      'module:react-native-dotenv',
      {

        moduleName: '@env',
        path: '.env',
        blocklist: null,
        allowlist: null,
        blacklist: null, // DEPRECATED
        whitelist: null, // DEPRECATED
        safe: false,
        allowUndefined: true,
        verbose: false,
      },
    ],
    // ['@babel/plugin-proposal-class-properties', {loose: true}],
    'react-native-reanimated/plugin',
  ],
  env: {
    production: {
      plugins: [['react-native-paper/babel'], ['transform-remove-console']],
    },
  },
};
