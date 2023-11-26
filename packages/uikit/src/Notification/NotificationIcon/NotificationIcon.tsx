import React from 'react';
import {AlertColor} from '@mui/material/Alert/Alert';

import {Icon, IconColor, IconSize, IconType} from '@infomat/uikit/src/Icon';

const NotificationIcon = ({notificationType}: TNotificationIconProps) => {
	switch (notificationType) {
		case 'success':
			return <Icon type={IconType.checkCircleRounded} color={IconColor.green} size={IconSize.small} />;
		case 'error':
			return <Icon type={IconType.error} color={IconColor.red} size={IconSize.small} />;
		case 'warning':
			return <Icon type={IconType.warning} color={IconColor.orange} size={IconSize.small} />;
		case 'info':
			return <Icon type={IconType.info} color={IconColor.blue} size={IconSize.small} />;
		default:
			return <Icon type={IconType.info} color={IconColor.blue} size={IconSize.small} />;
	}
};
type TNotificationIconProps = {
	notificationType?: AlertColor;
};

export default NotificationIcon;
