const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const assets = path.join(__dirname, "./src/app/assets/");
const dist = assets + "dist/";
const froms = {
  js: {
    account: assets + "js/account.js",
    main: assets + "js/main.js"
  },
  css: {
    account: assets + "styles/account.scss",
    main: assets + "styles/main.scss"
  }
};

module.exports = {
  mode: "production",
  entry: {
    account: froms.js.account,
    main: froms.js.main,
    "account.css": froms.css.account,
    "main.css": froms.css.main
  },
  output: {
    filename: "js/[name].js",
    path: dist
  },
  module: {
    rules: [
      {
        test: /\.scss/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name]"
    })
  ],
  resolve: {
    alias: {
      jui: "jquery-ui/ui"
    }
  },
  cache: true
};
