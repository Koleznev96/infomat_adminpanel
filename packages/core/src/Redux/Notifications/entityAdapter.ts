import {createEntityAdapter, EntityId} from '@reduxjs/toolkit';
import {SnackbarMessage} from 'notistack';
import {AlertColor} from '@mui/material/Alert/Alert';

import {EnumNotificationStatus} from '@infomat/core/src/Redux/Notifications/EnumNotificationStatus';
import EnumSnackbarNotificationKeys from '@infomat/core/src/BusinessLogic/EnumSnackbarNotificationKeys';
import {ReactNode} from 'react';

export const notificationsAdapter = createEntityAdapter<TNotification>({
	selectId: (notification): EntityId => notification.key,
});

export type TNotification = {
	key: string | EnumSnackbarNotificationKeys;
	notificationTitle: string | undefined;
	message: SnackbarMessage;
	status: EnumNotificationStatus;
	buttonTitle?: ReactNode;
	severity?: AlertColor;
	isLoading?: boolean;
	isShowButton?: boolean;
	duration?: number;
	isNotAutoClose?: boolean;
};
