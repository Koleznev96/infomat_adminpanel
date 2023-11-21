import {LinkProps} from 'react-router-dom';
import {useMemo} from 'react';

import getRouterLinkForMui from 'src/Utils/Navigation/getRouterLinkForMui';

const useRouterLinkForMui = (
	to: LinkProps['to'],
	replace: LinkProps['replace'] = false,
	onClick?: LinkProps['onClick'],
	state?: LinkProps['state'],
) => useMemo(() => getRouterLinkForMui({to, replace, onClick, state}), [to, replace, onClick, state]);

export default useRouterLinkForMui;
