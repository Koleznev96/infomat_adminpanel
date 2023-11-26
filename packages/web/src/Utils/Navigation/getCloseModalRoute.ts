import _ from 'lodash';

import {EnumRouteSlugs} from 'src/Routes/EnumRouteSlugs';

export const getCloseModalRoute = (pathname: string) => {
	return Array(_.chain(pathname).split('/').reverse().indexOf(EnumRouteSlugs.MODAL).value() + 1)
		.fill('..')
		.join('/');
};
