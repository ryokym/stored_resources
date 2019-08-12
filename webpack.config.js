const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
      account : './src/app/asset/js/account.js',
      main : './src/app/asset/js/main.js',
  },
  output: {
      filename: "[name].js",
      path: path.join(__dirname, './src/app/asset/js/dist')
  },
  resolve: {
    alias: {
      'jui': 'jquery-ui/ui',
    }
  },
  cache : true
};
