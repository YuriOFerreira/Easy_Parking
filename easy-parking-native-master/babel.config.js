module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@types': './src/types',
            '@components': './src/components',
            '@constants': './src/constants',
            '@helpers': './src/helpers',
            '@interface': './src/interface',
            '@routes': './src/routes',
            '@screens': './src/screens',
            '@services': './src/services',
            '@stores': './src/stores',
            '@hooks': './src/hooks',
          },
        },
      ],
    ],
  };
};
