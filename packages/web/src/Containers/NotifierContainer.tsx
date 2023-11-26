import _ from 'lodash';
import React from 'react';
import {useDispatch} from 'react-redux';
import {OptionsObject, useSnackbar} from 'notistack';
import {AlertColor} from '@mui/material/Alert/Alert';

import {useStoreSelector} from '@infomat/core/src/Hooks/useStoreSelector';
import {selectShowingNotifications} from '@infomat/core/src/Redux/Notifications/Selectors/selectShowingNotifications';
import {selectDismissingNotifications} from '@infomat/core/src/Redux/Notifications/Selectors/selectDismissingNotifications';
import {EnumNotificationStatus} from '@infomat/core/src/Redux/Notifications/EnumNotificationStatus';
import {EnumAbstractNotificationCloseReason} from '@infomat/core/src/Services/UINotification';
import notificationsClientOnlyActions from '@infomat/core/src/Redux/Notifications/Actions/notificationsClientOnlyActions';
import Notification from '@infomat/uikit/src/Notification/Notification';

const NotifierContainer = () => {
	const dispatch = useDispatch();
	const showingNotifications = useStoreSelector(selectShowingNotifications);
	const dismissingNotifications = useStoreSelector(selectDismissingNotifications);
	const {enqueueSnackbar, closeSnackbar} = useSnackbar();

	React.useEffect(() => {
		showingNotifications.forEach(
			({key, message, notificationTitle, buttonTitle, severity, isLoading, duration, isNotAutoClose}) => {
				const extendedOptions: OptionsObject = {
					key,
					autoHideDuration: duration,
					onClose: (event, reason, myKey) => {
						// prevent click-aways from closing the snack
						if (reason === EnumAbstractNotificationCloseReason.CLICKED_AWAY) {
							return;
						}
					},
					onExited: (node, myKey) => {
						// remove this snackbar from redux store
						if (!isNotAutoClose) {
							dispatch(notificationsClientOnlyActions.removeSnackbar(myKey));
						}
					},
				};

				const onClose = () => closeSnackbar(key);
				extendedOptions.content = (
					<Notification
						notificationTitle={notificationTitle}
						message={message}
						buttonTitle={buttonTitle as React.ReactNode}
						severity={severity as AlertColor}
						onClose={onClose}
						isLoading={isLoading}
					/>
				);
				// display snackbar using notistack
				enqueueSnackbar(message, extendedOptions);

				// keep track of snackbars that we've displayed
				dispatch(notificationsClientOnlyActions.changeStatus({key, status: EnumNotificationStatus.SHOWN}));
			},
		);

		_.forEach(dismissingNotifications, (notification) => {
			closeSnackbar(notification.key);
			dispatch(
				notificationsClientOnlyActions.changeStatus({key: notification.key, status: EnumNotificationStatus.DISMISSED}),
			);
		});
	}, [closeSnackbar, enqueueSnackbar, dispatch, showingNotifications, dismissingNotifications]);

	return null;
};

export default NotifierContainer;
