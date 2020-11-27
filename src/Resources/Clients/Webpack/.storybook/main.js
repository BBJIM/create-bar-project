const path = require('path');

module.exports = {
	stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'storybook-addon-styled-component-theme/dist/register',
	],
	typescript: {
		check: true,
		checkOptions: {
			tsconfig: path.resolve(__dirname, '../tsconfig.json'),
		},
	},
};
