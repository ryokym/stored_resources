const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const assets = path.join(__dirname, "./src/app/assets/");
const dist = assets + "dist/";
const froms = {
  js: {
    account: assets + "js/account.jsx",
    main: assets + "js/main.jsx"
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
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-react", "@babel/preset-env"]
            }
          }
        ]
      },
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
      filename: "css/[name]",
      path: dist
    })
  ],
  resolve: {
    alias: {
      jui: "jquery-ui/ui"
    }
  },
  cache: true
};
