// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

module.exports = getDefaultConfig(__dirname);
module.exports = {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
    },
    resolver: {
      assetExts: ['bin', 'txt', 'jpg', 'ttf', 'png','jpeg'],
      sourceExts: ['js', 'json', 'ts', 'tsx', 'jsx','jpeg'],
     
    },
  };
