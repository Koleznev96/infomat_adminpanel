import React, {FC} from 'react';

import DocumentTitle from 'src/Components/DocumentTitle';

const DocumentTitleContainer: FC<TDocumentTitleContainerProps> = (props) => {
	return <DocumentTitle {...props} />;
};

type TDocumentTitleContainerProps = {
	version?: string;
	delay?: number;
};

export default DocumentTitleContainer;
