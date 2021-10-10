const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'client', 'public'),
    filename: 'index.bundle.js',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader',
      },
      {
        test: /\.(css|s[ac]ss)$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|webm|mp4|svg)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'assets',
          esModule: false,
        },
      },
    ],
  },
  devServer: {
    // configuration webpack-dev-server version ^4.0.0
    // use contentBase if your webpack-dev-server is still under 4.0.0
    static: {
      directory: path.resolve(__dirname, 'client', 'public'),
    },
    port: 3000,
    historyApiFallback: true,
  },
}
