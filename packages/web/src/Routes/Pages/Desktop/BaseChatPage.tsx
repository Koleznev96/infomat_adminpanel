import React from 'react';
import {Outlet} from 'react-router-dom';

import MenuContainer from 'src/Components/Menu/MenuContainer';

function BaseChatPage() {
	return (
		<>
			<MenuContainer />
			<Outlet />
		</>
	);
}

export default BaseChatPage;
