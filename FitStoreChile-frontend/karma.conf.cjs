module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      'test/**/*.test.jsx'
    ],
    preprocessors: {
      'test/**/*.test.jsx': ['webpack', 'coverage']
    },
    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', ['@babel/preset-react', {"runtime": "automatic"}]]
              }
            }
          }
        ]
      },
      resolve: { extensions: ['.js', '.jsx'] }
    },
    browsers: ['ChromeHeadless'],
    singleRun: true,
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    }
  });
};