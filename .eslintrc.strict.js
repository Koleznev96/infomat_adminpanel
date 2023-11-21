module.exports = {
	root: true,
	env: {
		browser: true,
		es6: true,
	},
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 8,
	},
	overrides: [
		{
			files: ['*.ts', '*.tsx'],
			parser: '@typescript-eslint/parser',
			parserOptions: {
				sourceType: 'module',
				ecmaVersion: 2018,
				ecmaFeatures: {
					jsx: true,
				},
			},
			plugins: ['@typescript-eslint', 'functional', 'react', 'react-redux'],
			rules: {
				'@typescript-eslint/no-explicit-any': 'error',
				'@typescript-eslint/ban-ts-comment': 'warn',
				'@typescript-eslint/ban-types': 'error',
				'react-redux/no-unused-prop-types': 'warn',
				'react/display-name': 'warn',
				'functional/prefer-tacit': 'warn',
				'@typescript-eslint/naming-convention': [
					'warn',
					{selector: 'typeAlias', format: ['PascalCase'], prefix: ['T']},
				],
				'@typescript-eslint/consistent-type-definitions': ['warn', 'type'],
			},
		},
		{
			files: ['*.tsx'],
			rules: {
				'functional/no-class': 'warn',
				'functional/no-this-expression': 'warn',
				'no-restricted-syntax': [
					'warn',
					{
						selector: "CallExpression[callee.name='connect']",
						message: 'Using connect() is not allowed, please use hooks',
					},
					{
						selector: "CallExpression[callee.name='withTranslation']",
						message: 'Using withTranslation() is not allowed, please use hooks',
					},
				],
			},
		},
	],
};
