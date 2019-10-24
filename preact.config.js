const AssetsPlugin = require('assets-webpack-plugin');
const assetsJsonConfig = {
  filename: 'assets.json',
  prettyPrint: true,
  fullPath: true, 
  includeManifest: true,
  manifestFirst: true

}
const assetsPluginInstance = new AssetsPlugin(assetsJsonConfig);

export default (config, env, helpers) => {
  config.plugins.push(assetsPluginInstance);
};