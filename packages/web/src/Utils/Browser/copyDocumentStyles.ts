import _ from 'lodash';

import ServiceFactory from '@infomat/core/src/Services/ServiceFactory';

/**
 * @link https://stackoverflow.com/questions/51830425/applying-application-css-to-react-portal-opens-new-window-in-ie-edge
 */
export function copyDocumentStyles(sourceDoc: Document, targetDoc: Document) {
	Array.from(sourceDoc.styleSheets).forEach((styleSheet) => {
		let rules;
		try {
			rules = styleSheet.cssRules;
		} catch (e) {
			const errorMsg = `Can't read the css rules of: ${styleSheet.href}`;
			ServiceFactory.logService.error(errorMsg, e);
		}

		if (rules) {
			const newStyleEl = sourceDoc.createElement('style');

			Array.from(styleSheet.cssRules).forEach((cssRule) => {
				newStyleEl.appendChild(sourceDoc.createTextNode(cssRule.cssText));
			});

			targetDoc.head.appendChild(newStyleEl);
		} else {
			const newLinkEl = sourceDoc.createElement('link');

			if (_.isString(styleSheet.href)) {
				newLinkEl.rel = 'stylesheet';
				newLinkEl.href = styleSheet.href;
				targetDoc.head.appendChild(newLinkEl);
			}
		}
	});
}
