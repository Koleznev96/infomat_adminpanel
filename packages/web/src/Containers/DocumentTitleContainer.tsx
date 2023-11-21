import React, {FC} from 'react';

import {useStoreSelector} from '@infomat/core/src/Hooks/useStoreSelector';
// import selectUnseenWithoutArchivedFromSummary from '@infomat/core/src/Redux/Channels/Selectors/selectUnseenWithoutArchivedFromSummary';

import DocumentTitle from 'src/Components/DocumentTitle';

const DocumentTitleContainer: FC<TDocumentTitleContainerProps> = (props) => {
	return (
		<DocumentTitle
			{...props}
			// unseen={useStoreSelector(selectUnseenWithoutArchivedFromSummary)}
		/>
	);
};

type TDocumentTitleContainerProps = {
	version?: string;
	delay?: number;
};

export default DocumentTitleContainer;
