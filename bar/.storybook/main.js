const storiesRoot = '../packages/ui-kit';

module.exports = {
	stories: [`${storiesRoot}/**/*.stories.mdx`, `${storiesRoot}/**/*.stories.@(js|jsx|ts|tsx)`],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/preset-create-react-app',
		'storybook-addon-styled-component-theme/dist/register',
	],
};
