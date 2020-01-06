const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const assets = path.join(__dirname, "./src/assets/");
const views = path.join(__dirname, "/src/views/");
const dist = path.join(__dirname, "./src/dist/");
const froms = {
  js: {
    account: views + "account.jsx",
    main: views + "main.jsx"
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
            query: {
              babelrc: false,
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: [
                [
                  "@babel/plugin-proposal-class-properties",
                  {
                    loose: true
                  }
                ]
              ]
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
