const _ = require('lodash');
const plugins = [
	require('postcss-pxtorem')({
		unitPrecision: 4,
		minPixelValue: 2,
		propList: ['*'],
	}),
];

const addPostcssPluginsWebpack5 = () => (config) => {
	_.chain(config)
		.get('module.rules')
		.find((rule) => _.isArray(_.get(rule, 'oneOf')))
		.get('oneOf')
		.forEach((rule) => {
			_.chain(rule)
				.get('use')
				.forEach((use) => {
					if (_.get(use, 'options.postcssOptions.ident') === 'postcss') {
						const options = _.get(use, 'options.postcssOptions');

						options.plugins = !_.isEmpty(options.plugins) ? [...options.plugins, ...plugins] : [...plugins];
					}
				})
				.value();
		})
		.value();

	return config;
};

module.exports = {addPostcssPluginsWebpack5};
