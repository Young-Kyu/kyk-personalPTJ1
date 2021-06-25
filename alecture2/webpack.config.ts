import path from 'path';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import webpack from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

const isDevelopment = process.env.NODE_ENV !== 'production';

const config: webpack.Configuration = {
  name: 'sleact',
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'hidden-source-map' : 'inline-source-map'/*,'eval'*/,
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json','scss'],
    alias: {
      '@hooks': path.resolve(__dirname, 'hooks'),
      '@components': path.resolve(__dirname, 'components'),
      '@layouts': path.resolve(__dirname, 'layouts'),
      '@pages': path.resolve(__dirname, 'pages'),
      '@utils': path.resolve(__dirname, 'utils'),
      '@typings': path.resolve(__dirname, 'typings'),
      '@styles':path.resolve(__dirname,'styles')
    },
  },
  entry: {
    app: './client',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: { browsers: ['last 2 chrome versions'] },
                debug: isDevelopment,
              },
            ],
            '@babel/preset-react',
            '@babel/preset-typescript',
          ],
          env: {
            development: {
              plugins: [require.resolve('react-refresh/babel')],
            },
          },
        },
        exclude: path.join(__dirname, 'node_modules'),
      },
      {
        test: /\.(css|scss)?$/,
        use: [
            require.resolve('style-loader'),
            {
              loader:require.resolve('css-loader'),
              options:{
                importLoaders:1,
              
              }
            },
            {
              loader:require.resolve("sass-loader"),
              options:{
                sourceMap:true
              }
            }
          ],
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: false,
      // eslint: {
      //   files: "./src/**/*",
      // },
    }),
    new webpack.EnvironmentPlugin({ NODE_ENV: isDevelopment ? 'development' : 'production' }), // node의 processEnv nodeEnv를 프론트엔드에서 접근 가능하게 해주는 plugin
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/dist/',
  },
  devServer: {
    historyApiFallback: true, // true : URL을 기억하여 새로고침을 가능하게 만들어준다
    port: 3090,
    publicPath: '/dist/',
    // proxy:{ //cors 우회용 proxy 설정
    //   '/api/':{
    //     target:'http://localhost:4005',
    //     changeOrigin : true
    //   }
    // }
  },
};

if (isDevelopment && config.plugins) {
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.plugins.push(new ReactRefreshWebpackPlugin());
}
if (!isDevelopment && config.plugins) {
}

export default config;
