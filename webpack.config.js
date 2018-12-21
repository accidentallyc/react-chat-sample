 const path = require('path');
 const webpack = require('webpack');

module.exports = {
  // devtool: 'inline-source-map',
  mode: 'development',
  entry: './src/index.js',
  output: {
		filename: './bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: './dist',
		hot: true
  },
	module: {
		rules: [
		 {
		   test: /\.css$/,
		   use: [
		     'style-loader',
		     'css-loader'
		   ]
		 },
     {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        	loader: "babel-loader"
	      }
      }
		]
	}
};