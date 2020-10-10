var path = require('path');

const { override, babelInclude } = require('customize-cra');

module.exports = function (config, env) {
	return Object.assign(
		config,
		override(
			babelInclude([
				/* transpile (converting to es5) code in src/ and shared ui-kiy library */
				path.resolve('src'),
				path.resolve('../ui-kit'),
			]),
		)(config, env),
	);
};
