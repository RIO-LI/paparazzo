const path = require('path');
const webpack = require('webpack');

module.exports = function(env) {
  const productionBuild = env === 'production';
  const filename = `paparazzo${productionBuild ? '.min' : ''}.js`;
  const plugins = productionBuild ?
    [new webpack.optimize.UglifyJsPlugin({sourceMap: true})] :
    [];

  return {
    entry: './src/index.ts',
    devtool: 'source-map',
    resolve: {
      extensions: ['.ts', '.js']
    },
    output: {
      filename: filename,
      path: path.resolve(__dirname, 'lib'),
      libraryTarget: 'umd'
    },
    module: {
      loaders: [
        {
          test: /\.ts$/,
          exclude: /(node_modules)/,
          loader: 'ts-loader'
        }
      ],
      rules: [
        {
          test: /\.ts$/,
          use: ['ts-loader'],
          enforce: 'pre'
        },
        {
          test: /\.ts$/,
          enforce: 'pre',
          loader: 'tslint-loader',
          exclude: /(node_modules)/,
          options: { /* Loader options go here */ }
        }
      ]
    },
    plugins: plugins
  };
}
