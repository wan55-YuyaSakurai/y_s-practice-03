const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
const copyPlugin = require('copy-webpack-plugin');
const { dirname } = require('path');
const { resourceUsage } = require('process');

const devDir = './develop';
const imgDir = devDir + '/images';

const getFileName = function (path) {
  return path.replace(/\.[^/.]+$/, "")
}

const templates = [];

glob.sync("**/*.pug", {
  ignore: "**/_*.pug",
  cwd: devDir
}).map(function (file) {
  templates.push(
    new HtmlWebpackPlugin({
      template: path.resolve(devDir, file),
      filename: getFileName(file) + '.html'
    })
  )
})


module.exports = {
  entry: path.join(__dirname,"develop",".js","index.js"),

  output: {
    filename: "main.js",
    path: path.join(__dirname, 'public'),
    clean: true,
  },
  mode: "development",
  devServer: {
    static: "public",
    open: true,
  },

  module: {
    rules: [
      {
        test: /\.(css|sass|scss)$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              url: false,
            }
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  require('autoprefixer')({ grid: true })
                ],
              },
            },
          },
          {
            loader: 'sass-loader'
          },
        ],
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: `[name].[ext]`,
            outputPath: 'images',
            publicPath: 'images',
          }
        }
      },
      {
        test: /\.html$/,
        use:[
          {
            loader: 'html-loader',
            options: {
              source: true,
            },
          },
        ]
      },
      {
        test: /\.pug$/,
        use:[
          'pug-loader',
        ]
      },
    ],
  },



  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/style.css',
    }),
    new copyPlugin({
      patterns: [
        { from: 'develop/images', to: 'images' },
      ],
    }),
    ...templates,
    new HtmlWebpackPugPlugin(),
  ],
  devtool: false,
  watch: true ,
  watchOptions: {
    ignored: /node_modules/
  },

};





