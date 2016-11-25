/**
 * externals: {
        react: 'React'
    },
 */

import { BannerPlugin } from 'webpack';
import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { resolve } from 'path';

const autoprefixerCfg = { browsers: ['last 3 versions'] },
    srcLibName = 'paper-ui',
    distLibName = 'paper-ui',
    banner = `copy`;

export default {
    entry: `./examples/app.jsx`,
    output: {
        path: resolve(__dirname, '/dist'),
        libraryTarget: 'umd',
        library: srcLibName,
        filename: `${distLibName}.js`,
        publicPath: 'http://localhost:8080/assets',
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    },
    devtool: 'source-map',
    module: {
        loaders: [
            /* {
                test: /(\.jsx|\.js)$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /(\.jsx|\.js)$/,
                loader: 'eslint-loader',
                exclude: /(node_modules|bower_components|dist)/
            },*/
            {
                test: /(\.jsx|\.js)$/,
                loaders: ['babel', 'eslint'],
                exclude: /(node_modules|bower_components|dist)/
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader')
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin(`${distLibName}.css`),
        new BannerPlugin(banner)
    ],
    sassLoader: {
        outputStyle: 'nested'
    },
    postcss: () => [autoprefixer(autoprefixerCfg)],
    resolve: {
        extensions: ['', '.js', '.jsx', '.scss']
    }
};
