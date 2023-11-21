import _ from 'lodash';
import React from 'react';
import {useDispatch} from 'react-redux';
import {OptionsObject, SnackbarProps, useSnackbar} from 'notistack';
import {AlertColor} from '@mui/material/Alert/Alert';
import {Typography} from '@mui/material';
import {isMobile} from 'react-device-detect';

import ActionIconButton from '@infomat/uikit/src/IconButton/ActionIconButton/ActionIconButton';
import notificationsClientOnlyActions from '@infomat/core/src/Redux/Notifications/Actions/notificationsClientOnlyActions';
import {
	EnumAbstractNotificationCloseReason,
	EnumAbstractNotificationVariant,
} from '@infomat/core/src/Services/UINotification';
import {useStoreSelector} from '@infomat/core/src/Hooks/useStoreSelector';
import {selectShowNotificationPositionBottom} from '@infomat/core/src/Redux/Notifications/Selectors/selectShowNotificationPositionBottom';
import {selectShowingNotifications} from '@infomat/core/src/Redux/Notifications/Selectors/selectShowingNotifications';
import {selectDismissingNotifications} from '@infomat/core/src/Redux/Notifications/Selectors/selectDismissingNotifications';
import {EnumNotificationStatus} from '@infomat/core/src/Redux/Notifications/EnumNotificationStatus';
import Notification from '@infomat/uikit/src/Notification/Notification';
import {IconType} from '@infomat/uikit/src/Icon';
import {EnumNotificationSeverity} from '@infomat/uikit/src/Notification/EnumNotificationSeverity';
import ServiceFactory from '@infomat/core/src/Services/ServiceFactory';

const stylePositionTop: SnackbarProps = {
	anchorOrigin: {
		vertical: 'top',
		horizontal: 'center',
	},
	style: {
		paddingLeft: 16,
		paddingRight: 16,
		paddingBottom: 6,
	},
};

const stylePositionBottom: SnackbarProps = {
	anchorOrigin: {
		vertical: 'bottom',
		horizontal: 'center',
	},
	style: {
		padding: 0,
	},
};

const NotifierContainer = () => {
	const dispatch = useDispatch();
	const showingNotifications = useStoreSelector(selectShowingNotifications);
	const dismissingNotifications = useStoreSelector(selectDismissingNotifications);
	const showNotificationPositionBottom = useStoreSelector(selectShowNotificationPositionBottom);
	const {enqueueSnackbar, closeSnackbar} = useSnackbar();
	const isAppMobile = isMobile && ServiceFactory.env.isAppMobileEnabled();

	// React.useEffect(() => {
	// 	showingNotifications.forEach(({key, message, notificationTitle, options, isOnlyMobile, isPositionBottom}) => {
	// 		if (
	// 			(isOnlyMobile && !isAppMobile) ||
	// 			(isPositionBottom && !_.isUndefined(showNotificationPositionBottom) && isAppMobile)
	// 		) {
	// 			return;
	// 		}

	// 		const extendedOptions: OptionsObject = {
	// 			key,
	// 			...(_.isEmpty(options) ? {} : options),
	// 			...(isPositionBottom && isAppMobile ? stylePositionBottom : stylePositionTop),
	// 			onClose: (event, reason, myKey) => {
	// 				// prevent click-aways from closing the snack
	// 				if (reason === EnumAbstractNotificationCloseReason.CLICKED_AWAY) {
	// 					return;
	// 				}

	// 				if (!_.isEmpty(options) && _.isFunction(options.onClose)) {
	// 					options.onClose(event, reason as never as EnumAbstractNotificationCloseReason, myKey as string);
	// 				}
	// 			},
	// 			onExited: (node, myKey) => {
	// 				// remove this snackbar from redux store
	// 				dispatch(notificationsClientOnlyActions.removeSnackbar(myKey));
	// 			},
	// 		};

	// 		const onClose = () => closeSnackbar(extendedOptions.key);

	// 		if (_.isUndefined(extendedOptions.content) && extendedOptions.variant === EnumAbstractNotificationVariant.ERROR) {
	// 			extendedOptions.content = (
	// 				<Notification
	// 					notificationTitle={notificationTitle}
	// 					message={<Typography>{message}</Typography>}
	// 					severity={EnumNotificationSeverity.ERROR}
	// 					onClose={onClose}
	// 					action={
	// 						<>
	// 							{!_.isUndefined(extendedOptions.action) && extendedOptions.action}
	// 							<ActionIconButton iconType={IconType.close} className="close-button" onClick={onClose} size="large" />
	// 						</>
	// 					}
	// 				/>
	// 			);
	// 		}
	// 		if (_.isUndefined(extendedOptions.content)) {
	// 			extendedOptions.content = (
	// 				<Notification
	// 					notificationTitle={notificationTitle}
	// 					message={message}
	// 					action={extendedOptions.action as React.ReactNode}
	// 					severity={extendedOptions.variant as AlertColor}
	// 					color={options.color}
	// 					onClose={onClose}
	// 				/>
	// 			);
	// 		}
	// 		// display snackbar using notistack
	// 		enqueueSnackbar(message, extendedOptions);

	// 		// keep track of snackbars that we've displayed
	// 		dispatch(notificationsClientOnlyActions.changeStatus({key, status: EnumNotificationStatus.SHOWN}));
	// 	});

	// 	_.forEach(dismissingNotifications, (notification) => {
	// 		closeSnackbar(notification.key);
	// 		dispatch(
	// 			notificationsClientOnlyActions.changeStatus({key: notification.key, status: EnumNotificationStatus.DISMISSED}),
	// 		);
	// 	});
	// }, [
	// 	closeSnackbar,
	// 	enqueueSnackbar,
	// 	dispatch,
	// 	showNotificationPositionBottom,
	// 	showingNotifications,
	// 	dismissingNotifications,
	// 	isAppMobile,
	// ]);

	return null;
};

export default NotifierContainer;
