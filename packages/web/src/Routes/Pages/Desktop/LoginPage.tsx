import React from 'react';
import {Helmet} from 'react-helmet';

import LoginContainer from 'src/Components/Login/LoginContainer';

const LoginPage = () => {
	const title = 'Авторизация';

	return (
		<>
			<Helmet title={title} />
			<LoginContainer />
		</>
	);
};

export default LoginPage;
