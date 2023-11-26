import React, {ReactNode} from 'react';
import classNames from 'classnames';

import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';
import EnumChatPageTestIds from '@infomat/uikit/src/TestIds/EnumChatPageTestIds';

import style from './MediaPlaceholder.module.scss';

const MediaPlaceholder = ({onClick, children}: TMediaPlaceholderProps) => {
	return (
		<div
			className={classNames(style.container, {[style.clickable]: Boolean(onClick)})}
			onClick={onClick}
			data-test-id={EnumChatPageTestIds.MEDIA_PLACEHOLDER}
		>
			{children}
		</div>
	);
};

type TMediaPlaceholderProps = {
	onClick?: PropertyHandler;
	children: ReactNode;
};
export default MediaPlaceholder;
