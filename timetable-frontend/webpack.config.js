module.exports = {
  entry: './src/app.js',
  output: {
    path: '../timetable-planner/express-api/public',
    filename: 'app.bundle.js',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }]
  }
}
