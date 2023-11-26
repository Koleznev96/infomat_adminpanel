import _ from 'lodash';

export const trimTestPath = (filePath: string) =>
	_.chain(filePath).replace(/\\/g, '/').split('/packages/').last().value();
