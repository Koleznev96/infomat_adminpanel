import React from 'react';
import classNames from 'classnames';

import {Icon, IconSize, IconType} from '@infomat/uikit/src/Icon';

import style from './DropZoneOverlay.module.scss';

const DropZoneOverlay = ({isActive, isIconHidden = false, size = IconSize.xxlarge}: IDropZoneOverlayProps) => {
	return (
		<div className={classNames(style.container, {[style.active]: isActive})}>
			<div className={classNames(style.entry)}>
				{!isIconHidden && <Icon type={IconType.insertDriveFile} size={size} />}
			</div>
		</div>
	);
};

interface IDropZoneOverlayProps {
	isActive: boolean;
	isIconHidden?: boolean;
	size?: IconSize;
}

export default DropZoneOverlay;
