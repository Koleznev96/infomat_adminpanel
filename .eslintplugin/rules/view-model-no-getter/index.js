const _ = require('lodash');

module.exports = {
	meta: {
		docs: {
			description: 'Checking to prevent the use of getters in view models',
			category: 'Possible Errors',
			recommended: false,
		},
		schema: [],
	},
	create(context) {
		return {
			ClassDeclaration: function (node) {
				if (node.id.name.endsWith('VM') || node.id.name.endsWith('ViewModel')) {
					_.chain(node.body.body)
						.filter({kind: 'get'})
						.forEach((classProperty) =>
							context.report({node: classProperty, message: 'Getters are not allowed in view models.'}),
						)
						.value();
				}
			},
		};
	},
};
