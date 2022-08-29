
const { getDefaultConfig } = require('metro-config');
const path = require('path')

module.exports = (async () => {
  const {
    resolver: { sourceExts },
  } = await getDefaultConfig();
  return {
    resolver: {
      // Add cjs extension so stylis will load.
      sourceExts: [...sourceExts, 'cjs'],
      stream: path.resolve(__dirname, './node_modules/readable-stream'),
    },
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
    },
  };
})();