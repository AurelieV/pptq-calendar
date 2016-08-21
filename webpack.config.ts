/**
 * @author: @AngularClass
 */
const {
  ContextReplacementPlugin,
  DefinePlugin,
  ProgressPlugin,
  HotModuleReplacementPlugin,

  optimize: {
    CommonsChunkPlugin,
    DedupePlugin
  }

} = require('webpack');
const {ForkCheckerPlugin} = require('awesome-typescript-loader');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dashboard = require('webpack-dashboard');
const DashboardPlugin = require('webpack-dashboard/plugin');
const dashboard = new Dashboard();

const path = require('path');

function root(__path = '.') {
  return path.join(__dirname, __path);
}

// type definition for WebpackConfig at the bottom
function webpackConfig(options: EnvOptions = {}): WebpackConfig {

  const CONSTANTS = {
    ENV: JSON.stringify(options.ENV),
    HMR: options.HMR,
    PORT: 3000,
    HOST: 'localhost',
    HTTPS: false
  };

  return {
    cache: true,
    // devtool: 'hidden-source-map',
    devtool: 'source-map',
    // devtool: 'cheap-module-eval-source-map',

    entry: {
      polyfills: './client/polyfills.browser',
      vendor:    './client/vendor.browser',
      main:      './client/main.browser'
    },

    output: {
      path: root('dist/static'),
      filename: '[name].bundle.js',
      sourceMapFilename: '[name].map',
      chunkFilename: '[id].chunk.js'
    },

    module: {
      preLoaders: [
        // fix angular2
        {
          test: /(systemjs_component_resolver|system_js_ng_module_factory_loader)\.js$/,
          loader: 'string-replace-loader',
          query: {
            search: '(lang_1(.*[\\n\\r]\\s*\\.|\\.))?(global(.*[\\n\\r]\\s*\\.|\\.))?(System|SystemJS)(.*[\\n\\r]\\s*\\.|\\.)import',
            replace: 'System.import',
            flags: 'g'
          }
        },
        {
          test: /.js$/,
          loader: 'string-replace-loader',
          query: {
            search: 'moduleId: module.id,',
            replace: '',
            flags: 'g'
          }
        }
        // end angular2 fix
      ],

      loaders: [
        // Support for .ts files.
        {
          test: /\.ts$/,
          loaders: [
            'awesome-typescript-loader'
          ],
          exclude: [/\.(spec|e2e|d)\.ts$/]
        },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: "url-loader?limit=10000&mimetype=application/font-woff"
        },
        {
          test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: "file-loader"
        },
        { test: /\.json$/, loader: 'json-loader' },
        { test: /\.html/,  loader: 'raw-loader' },
        { test: /\.css$/,  loader: 'raw-loader' },
        { test: /\.scss/,  loaders: ['raw-loader','sass-loader']}
      ]
    },

    plugins: [
      new DashboardPlugin(dashboard.setData),
      new ForkCheckerPlugin(),
      new CommonsChunkPlugin({ name: ['main', 'vendor', 'polyfills'], minChunks: Infinity }),
      new DefinePlugin(CONSTANTS),
      new ProgressPlugin({}),
      new HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: 'client/index.html',
        chunksSortMode: 'dependency',
        filename: '../index.html'
      }),
      new CopyWebpackPlugin([{
        from: 'client/assets',
        to: 'assets'
      }]),
      // Fix angular2 warning
      new ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/)
    ],

    resolve: {
      extensions: ['', '.ts', '.js', '.json'],
      root: root('client')
    },

    devServer: {
      quiet: true,
      outputPath: root('dist'),
      contentBase: './dist',
      port: CONSTANTS.PORT,
      hot: CONSTANTS.HMR,
      inline: CONSTANTS.HMR,
      historyApiFallback: true,
      host: CONSTANTS.HOST,
      https: CONSTANTS.HTTPS,
      proxy: {
        '*/api': {
          target: 'http://localhost:3001',
          secure: false
        }
      }
    },

    node: {
      global: 'window',
      process: true,
      Buffer: false,
      crypto: 'empty',
      module: false,
      clearImmediate: false,
      setImmediate: false,
      clearTimeout: true,
      setTimeout: true
    }
  };
}

// Export
module.exports = webpackConfig;

// Types
type Entry = Array<string> | Object;

type Output = Array<string> | {
  path: string,
  filename: string
};

type EnvOptions = any;

interface WebpackConfig {
  cache?: boolean;
  target?: string;
  devtool?: string;
  entry: Entry;
  output: any;
  module?: any;
  // module?: {
  //   preLoaders?: Array<any>;
  //   loaders?: Array<any>;
  //   postLoaders?: Array<any>
  // };
  plugins?: Array<any>;
  resolve?: {
    root?: string;
    extensions?: Array<string>;
  };
  devServer?: {
    quiet?: boolean,
    contentBase?: string;
    port?: number;
    outputPath: string;
    historyApiFallback?: boolean;
    hot?: boolean;
    inline?: boolean;
    host?: string;
    https?: boolean;
    proxy?: any;
    setup?: Function;
  };
  node?: {
    process?: boolean;
    global?: boolean | string;
    Buffer?: boolean;
    crypto?: string | boolean;
    module?: boolean;
    clearImmediate?: boolean;
    setImmediate?: boolean
    clearTimeout?: boolean;
    setTimeout?: boolean
  };
}
