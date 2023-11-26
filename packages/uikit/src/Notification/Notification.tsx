import {Alert, AlertTitle, CircularProgress} from '@mui/material';
import React, {ForwardedRef, ReactNode} from 'react';
import {AlertProps} from '@mui/material/Alert/Alert';
import _ from 'lodash';
import classNames from 'classnames';

import NotificationIcon from '@infomat/uikit/src/Notification/NotificationIcon/NotificationIcon';
import {EnumNotificationSeverity} from '@infomat/uikit/src/Notification/EnumNotificationSeverity';
import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';

import style from './Notification.module.scss';
import Button from '../Button/Button';
import {Icon, IconColor, IconSize, IconType} from '../Icon';

const Notification = React.forwardRef(
	(
		{
			message,
			action,
			notificationTitle,
			severity,
			role = 'alert',
			withIcon = true,
			className,
			onClose,
			isLoading,
			buttonTitle,
			...props
		}: TNotificationProps,
		ref: ForwardedRef<HTMLDivElement>,
	) => {
		const icon = !isLoading ? (
			<NotificationIcon notificationType={severity} />
		) : (
			<CircularProgress color={severity} size={18} />
		);

		return (
			<Alert
				icon={withIcon ? icon : false}
				role={role}
				ref={(el) => {
					if (_.isFunction(ref)) {
						ref(el);
					} else if (ref) {
						ref.current = el;
					}
				}}
				severity={severity}
				action={
					buttonTitle ? (
						<div className={style.buttonTitle}>
							<Button onClick={onClose} size="small">
								{buttonTitle}
							</Button>
						</div>
					) : (
						<Button
							iconSize={IconSize.default}
							iconColor={IconColor.grey}
							startIconType={IconType.close}
							onClick={onClose}
							size="small"
						>
							{/* <Icon color={IconColor.grey} type={IconType.close} /> */}
						</Button>
					)
				}
				// elevation={!severity || severity === 'info' ? 6 : 0}
				className={classNames(
					style.root,
					{
						[style.noSeverityTextColor]: _.isUndefined(severity),
						[style.noSeverityBackground]: _.isUndefined(severity),
						[style.variantInfo]: severity === EnumNotificationSeverity.INFO,
						[style.variantWarning]: severity === EnumNotificationSeverity.WARNING,
						[style.variantError]: severity === EnumNotificationSeverity.ERROR,
						[style.variantSuccess]: severity === EnumNotificationSeverity.SUCCESS,
					},
					className,
				)}
				{...props}
			>
				{notificationTitle && (
					<AlertTitle
						className={classNames(style.title, {
							[style.noSeverityTextColor]: _.isUndefined(severity),
						})}
					>
						{notificationTitle}
					</AlertTitle>
				)}
				<div className={style.message}>{message}</div>
			</Alert>
		);
	},
);

Notification.displayName = 'Notification';

type TNotificationProps = Omit<AlertProps, 'onClose'> & {
	isLoading?: boolean;
	buttonTitle?: ReactNode;
	message: ReactNode;
	notificationTitle?: ReactNode;
	withIcon?: boolean;
	onClose?: PropertyHandler<undefined>;
};

export default Notification;
