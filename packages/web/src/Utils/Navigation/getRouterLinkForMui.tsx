import React, {forwardRef} from 'react';
import {Link, LinkProps} from 'react-router-dom';

import {Routes} from 'src/Routes/Routes';

const getRouterLinkForMui = (linkProps: LinkProps) => {
	return forwardRef<HTMLAnchorElement, Partial<LinkProps>>((props, ref) => (
		<Link {...props} {...linkProps} role={undefined} ref={ref} relative={undefined} />
	));
};

export default getRouterLinkForMui;
