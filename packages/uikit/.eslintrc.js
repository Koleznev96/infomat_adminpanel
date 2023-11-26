module.exports = {
	parserOptions: {
		project: './tsconfig.json',
	},
	overrides: [
		{
			files: ['*.ts', '*.tsx'],
			rules: {
				'no-restricted-imports': [
					'error',
					{
						paths: ['@material-ui'],
						patterns: [
							'@material-ui/*',
							'@infomat/web/*',

							'@infomat/core/*',
							'!@infomat/core/src',
							'@infomat/core/src/*',
							'!@infomat/core/src/Hooks',
							'!@infomat/core/src/Utils',
							'!@infomat/core/src/Types',

							'!@infomat/core/src/Services',
							'@infomat/core/src/Services/*',
							'!@infomat/core/src/BusinessLogic',
							'@infomat/core/src/BusinessLogic/*',
							'!@infomat/core/src/BusinessLogic/Constants',
							'!@infomat/core/src/BusinessLogic/SupportedSystemMessageIcons',
							'!@infomat/core/src/BusinessLogic/EnumSystemEmoji',
							'!@infomat/core/src/BusinessLogic/EnumMessagePartType',
							'!@infomat/core/src/BusinessLogic/IMessagePart',
							'!@infomat/core/src/BusinessLogic/EnumMessageHearts',

							'!@infomat/core/src/BusinessLogic/Media',
							'@infomat/core/src/BusinessLogic/Media/*',
							'!@infomat/core/src/BusinessLogic/Media/MessagePurchasedKeysList',
							'../',
						],
					},
				],
			},
		},
	],
};
