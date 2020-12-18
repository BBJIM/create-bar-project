import path from 'path';
import webpack from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

const isDevelopment = process.env.NODE_ENV !== 'production';
const paths = {
	assets: path.resolve(__dirname, 'assets/'),
	build: path.resolve(__dirname, 'build'),
	htmlTemplate: './public/index.html',
	env: path.resolve(__dirname, `./.env.${process.env.NODE_ENV || 'development'}`),
};

const forkTsCheckerWebpackPlugin = new ForkTsCheckerWebpackPlugin({
	async: false,
	eslint: {
		files: './src/**/*',
	},
});

const htmlWebpackPluginPlugin = new HtmlWebpackPlugin({
	template: paths.htmlTemplate,
	inject: true,
	filename: './index.html',
	minify: 'auto',
});

const copyPlugin = new CopyPlugin({
	patterns: [{ from: paths.assets, to: paths.build }],
});

const cleanWebpackPlugin = new CleanWebpackPlugin({});

const dotenvPlugin = new Dotenv({
	path: paths.env,
	safe: true,
	silent: true,
});

const tsPathsResolvePlugin = new TsconfigPathsPlugin({});

const config: webpack.Configuration = {
	mode: isDevelopment ? 'development' : 'production',
	entry: './src/index.tsx',
	devtool: isDevelopment ? 'inline-source-map' : 'source-map',
	module: {
		rules: [
			{
				test: /\.(ts|js)x?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
				use: {
					loader: 'url-loader',
					options: {
						name: '[name].[ext]',
						limit: 10000,
					},
				},
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
	plugins: [forkTsCheckerWebpackPlugin, htmlWebpackPluginPlugin, copyPlugin, dotenvPlugin, cleanWebpackPlugin],
	resolve: {
		extensions: ['.tsx', '.ts', '.jsx', '.js'],
		plugins: [tsPathsResolvePlugin],
	},
	output: {
		path: paths.build,
		filename: `[name]-[${isDevelopment ? 'fullhash' : 'contenthash'}].js`,
		publicPath: '/',
	},
	devServer: isDevelopment
		? {
				contentBase: paths.assets,
				compress: true,
				port: 3000,
				hot: true,
				inline: true,
				historyApiFallback: true,
		  }
		: undefined,
	stats: {
		errorDetails: true,
	},
	optimization: isDevelopment
		? undefined
		: {
				splitChunks: {
					chunks: 'all',
				},
		  },
};

export default config;
