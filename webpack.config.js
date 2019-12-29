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
    account: assets + "styles/account/account.scss",
    main: assets + "styles/main/main.scss"
  }
};

module.exports = {
  mode: "development",
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
  plugins: [
    new FixStyleOnlyEntriesPlugin({
      extensions: ["scss", "css"]
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name]"
    })
  ],
  module: {
    rules: [
      {
        test: /\.scss/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new FixStyleOnlyEntriesPlugin({
      extensions: ["scss", "css"]
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name]"
    })
  ],
  resolve: {
    alias: {
      jui: "jquery-ui/ui"
    }
  },
<<<<<<< HEAD
=======
  cache: true
>>>>>>> 34e0d3e3... jsとsassのbundle結果をmodel別にoutput
};
