var webpack = require("webpack");

module.exports = {
  entry: './src/app.jsx',
  output: {
    filename: 'bundle.js',
    publicPath: '/js'
  },
  module: {
    loaders: [
      {
        //use babel-loader for all .jsx files
        test: /\.jsx?$/,
        exlude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      }
    })
  ]
}
