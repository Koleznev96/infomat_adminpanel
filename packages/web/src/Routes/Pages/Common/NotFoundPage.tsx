import React from 'react';
import {Helmet} from 'react-helmet';

import PageNotFound from 'src/Components/PageNotFound/PageNotFound';

const NotFoundPage = () => {
	const title = 'Страница не найдена';
	return (
		<>
			<Helmet title={title} />
			<PageNotFound />
		</>
	);
};

export default NotFoundPage;
