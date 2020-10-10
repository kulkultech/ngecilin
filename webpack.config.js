const Dotenv = require('dotenv-webpack');
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');
const mode = 'production';
const manifestJs = require('./src/manifest.js');
const CopyPlugin = require('copy-webpack-plugin');
const HandlebarsPlugin = require("handlebars-webpack-plugin");

const background = {
  entry: {
    index: './src/background/index.js',
  },
  plugins: [
    new Dotenv({
      path: './.env', // Path to .env file (this is the default)
      safe: false, // load .env.example (defaults to "false" which does not use dotenv-safe)
    }),
  ],
  output: {
    filename: './background/[name].js',
  },
};

const options = {
  entry: {
    index: './src/options/index.js',
  },
  output: {
    filename: './options/index.js',
  },
  plugins: [
    new Dotenv({
      path: './.env', // Path to .env file (this is the default)
      safe: false, // load .env.example (defaults to "false" which does not use dotenv-safe)
    }),
    new HtmlWebpackPlugin({
      template: './src/options/index.pug',
      filename: './options/index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: require.resolve('./src/options/index.pug'),
        use: ['pug-loader'],
      },
    ],
  },
};

const manifest = [
  new ManifestPlugin({
    fileName: 'manifest.json',
    basePath: 'dist',
    seed: manifestJs.manifest,
    filter: (object) => manifestJs.filters.includes(object.name),
  }),
];

const assets = [
  new CopyPlugin({
    patterns: [
      {
        from: './src/assets',
        to: './assets',
      },
    ]
  })];

const popup = {
  entry: [
    './src/popup/index.js',
    './src/popup/assets/style.scss',
  ],
  output: {
    filename: './popup/index.js',
  },
  plugins: [
    new Dotenv({
      path: './.env', // Path to .env file (this is the default)
      safe: false, // load .env.example (defaults to "false" which does not use dotenv-safe)
    }),
    new CopyPlugin({
      patterns: [
        {
          from: './src/popup/assets',
          to: './popup/assets',
          globOptions: {
            ignore: ['**/*.scss'],
          },
        },
      ]
    }),
    new HandlebarsPlugin({
      entry: './src/popup/index.hbs',
      output: './dist/popup/index.html',
    }),
    ...assets,
    ...manifest,
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        loaders: [
          {
            loader: 'file-loader',
            options: {
              name: 'popup/assets/style.css',
            },
          },
          'extract-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.hbs$/,
        loader: "handlebars-loader",
        // fix: https://github.com/LearnWebCode/handlebars-webpack/blob/master/webpack.config.js
        options: { helperDirs: path.resolve(__dirname, "./src/popup/templates/helpers") }
      }
    ],
  },
};

module.exports = [
  background,
  options,
  popup,
].map((bundle) => Object.assign(bundle, {
  // node: {
  //   // to fixed Error: Can't resolve 'fs'
  //   fs: 'empty'
  // },
  watch: (process.env.NODE_ENV === 'development'),
  mode,
  devServer: {
    contentBase: 'dist',
    hot: true,
  },
}));