import cuid from 'cuid';
import {EntityId} from '@reduxjs/toolkit';
import _ from 'lodash';
import {AlertColor} from '@mui/material/Alert/Alert';

import {ClientOnlyActions} from '@infomat/core/src/Actions/ActionCreator';
import EnumStore from '@infomat/core/src/BusinessLogic/EnumStore';
import {TNotification} from '@infomat/core/src/Redux/Notifications/entityAdapter';
import {EnumAbstractNotificationVariant, TAbstractNotificationOptions} from '@infomat/core/src/Services/UINotification';
import {EnumNotificationStatus} from '@infomat/core/src/Redux/Notifications/EnumNotificationStatus';
import EnumSnackbarNotificationKeys from '@infomat/core/src/BusinessLogic/EnumSnackbarNotificationKeys';
import {ReactNode} from 'react';

enum EnumClientOnlyActions {
	CLICK_ON_NOTIFICATION = 'CLICK_ON_NOTIFICATION',
	ENQUEUE = 'ENQUEUE',
	CLOSE = 'CLOSE',
	REMOVE = 'REMOVE',
	DISMISS_MANY = 'DISMISS_MANY',
	CLOSE_NON_ERROR_NOTIFICATIONS = 'CLOSE_NOT_ERROR_NOTIFICATIONS',
	CHANGE_NOTIFICATION_STATUS = 'CHANGE_NOTIFICATION_STATUS',
	ADD_NOTIFICATION_TO_STORE = 'ADD_NOTIFICATION_TO_STORE',
	RESET_STORE = 'RESET_STORE',
}

class NotificationsClientOnlyActions extends ClientOnlyActions<EnumStore.CLIENT> {
	readonly scope = EnumStore.CLIENT;

	clickOnNotification = this.createAction(EnumClientOnlyActions.CLICK_ON_NOTIFICATION, this.getPrepareAction<string>());

	enqueueSnackbar = this.createAction(EnumClientOnlyActions.ENQUEUE, (payload: TNotification) => ({
		payload: {
			...payload,
			key: payload.key || cuid.slug(),
		},
	}));

	enqueuePersistent = this.createAction(
		EnumClientOnlyActions.ENQUEUE,
		(data: {
			key?: string | EnumSnackbarNotificationKeys;
			notificationTitle?: string | undefined;
			message?: string;
			status?: EnumNotificationStatus;
			buttonTitle?: ReactNode;
			severity?: AlertColor;
			isLoading?: boolean;
			isShowButton?: boolean;
			duration?: number;
			isNotAutoClose?: boolean;
		}) => ({
			payload: {
				key: cuid.slug(),
				status: EnumNotificationStatus.SHOWING,
				message: '',
				notificationTitle: '',
				...data,
			},
		}),
	);

	enqueueType = this.createAction(
		EnumClientOnlyActions.ENQUEUE,
		(
			message: string,
			type?: EnumAbstractNotificationVariant,
			optionOverrides?: Partial<TAbstractNotificationOptions>,
			notificationTitle?: string,
			isOnlyMobile?: boolean,
			isPositionBottom?: boolean,
		) => ({
			payload: {
				key: optionOverrides?.key || cuid.slug(),
				notificationTitle: notificationTitle,
				isOnlyMobile: isOnlyMobile,
				isPositionBottom: isPositionBottom,
				message: message,
				options: _.assign(optionOverrides, {variant: type}),
				status: EnumNotificationStatus.SHOWING,
			} as TNotification,
		}),
	);
	closeSnackbar = this.createAction(EnumClientOnlyActions.CLOSE, (key?: EntityId) => ({
		payload: key,
	}));
	removeSnackbar = this.createAction(EnumClientOnlyActions.REMOVE, this.getPrepareAction<EntityId>());
	dismissMany = this.createAction(EnumClientOnlyActions.DISMISS_MANY, (keys: EntityId[]) => ({
		payload: _.map(keys, (key) => ({id: key, changes: {status: EnumNotificationStatus.DISMISSING}})),
	}));

	closeNonErrorNotifications = this.createAction(EnumClientOnlyActions.CLOSE_NON_ERROR_NOTIFICATIONS);

	changeStatus = this.createAction(
		EnumClientOnlyActions.CHANGE_NOTIFICATION_STATUS,
		this.getPrepareAction<{key: string; status: EnumNotificationStatus}>(),
	);

	addNotificationToStore = this.createAction(
		EnumClientOnlyActions.ADD_NOTIFICATION_TO_STORE,
		this.getPrepareAction<TNotification>(),
	);

	resetStore = this.createAction(EnumClientOnlyActions.RESET_STORE);
}

const notificationsClientOnlyActions = new NotificationsClientOnlyActions();

export default notificationsClientOnlyActions;
