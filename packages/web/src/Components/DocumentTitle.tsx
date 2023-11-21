import React, {FC, useEffect, useState} from 'react';
import {Helmet} from 'react-helmet';

import ServiceFactory from '@infomat/core/src/Services/ServiceFactory';

const DocumentTitle: FC<TDocumentTitleProps> = ({
	unseen = 0,
	version = ServiceFactory.env.getVersion(),
	delay = 1000,
}) => {
	const title = `Инфомат ${version}`;
	let unseenTitle = '';

	const [offset, setOffset] = useState(unseen > 0 ? 5 : 0);

	useEffect(() => {
		const updateTitle = (interval: ReturnType<typeof setInterval>) => {
			if (unseen === 0) {
				clearInterval(interval);
			}

			setOffset(unseen > 0 && offset < 5 ? offset + 1 : 0);
		};

		const interval: ReturnType<typeof setInterval> = setInterval(() => updateTitle(interval), delay);

		return () => {
			null !== interval && clearInterval(interval);
		};
	}, [unseen, delay, offset, setOffset]);

	return (
		<Helmet defaultTitle={title} titleTemplate={`${unseenTitle.substring(offset)} %s | ${title}`}>
			<meta name="description" content={'Инфомат'} />
			<meta property="og:title" content={'Инфомат'} />
		</Helmet>
	);
};

type TDocumentTitleProps = {
	unseen?: number;
	version?: string;
	delay?: number;
};

export default DocumentTitle;
