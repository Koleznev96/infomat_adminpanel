const _ = require('lodash');

const extendEslintrcRestrictedImports = function (config, {patterns, paths}) {
	const [severity, settings] = _.find(config.overrides, {files: ['*.ts', '*.tsx']})?.rules['no-restricted-imports'];

	if (patterns) {
		settings.patterns = [...settings.patterns, {group: patterns}];
	}

	if (paths) {
		settings.paths = [...settings.paths, ...paths];
	}

	return [severity, settings];
};

module.exports = {extendEslintrcRestrictedImports};
