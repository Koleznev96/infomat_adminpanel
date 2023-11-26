const commonConfig = require('../../.eslintrc.js');
const {extendEslintrcRestrictedImports} = require('../../scripts/extendEslintrcRestrictedImports');

module.exports = {
	parserOptions: {
		project: './tsconfig.json',
	},
	overrides: [
		{
			files: ['*.ts', '*.tsx'],
			plugins: ['local'],
			rules: {
				'no-restricted-imports': extendEslintrcRestrictedImports(commonConfig, {
					patterns: ['@infomat/web/*'],
				}),
				'local/view-model-no-getter': 'error',
			},
		},
	],
};
