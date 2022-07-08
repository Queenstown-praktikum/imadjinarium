/**
 * Базовая когфигурация
 * Тут общие настройки как для PRODUCTION так и для DEVELOPMENT
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const _path = (alias) => {
    return path.resolve(__dirname, alias);
}

module.exports = {
    entry: _path('../src/index.js'),
    output: {
        filename: 'main-[hash:4].js',
        path: _path('../dist'),
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            //Тут будут алиасы к папкам
            // 'Components': _path('src/Components/'),
        }
    },
    module: {
        rules: []
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: _path('../public/index.html'),
        }),
        //Рлагин копирует файлы в dist
        // new CopyPlugin({
        //     patterns: [{ from: _path('../src/Icons'), to: _path('../dist') }],
        // }),
    ]
}
