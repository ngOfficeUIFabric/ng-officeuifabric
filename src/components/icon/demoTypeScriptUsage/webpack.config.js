module.exports = {
  entry: './index.ts',
  output: {
    filename: 'bundle.js'
  },
  externals: {
    'angular': 'angular'
  },
  module: {
    target: 'web',
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.ts']
  }
}