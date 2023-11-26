import React, {ReactElement} from 'react';
import {Tooltip, Grid} from '@mui/material';

import {Icon, IconColor, IconSize, IconType} from '@infomat/uikit/src/Icon';

import style from './ReminderTooltip.module.scss';

const ReminderTooltip = ({title, isOpen, handleClick, children}: TReminderTooltipProps) => (
	<Tooltip
		title={
			<Grid container direction="row" justifyContent="space-between" alignItems="center">
				<Grid item sx={{width: '95%'}}>
					{title}
				</Grid>
				<Grid item sx={{width: '5%'}}>
					<Icon type={IconType.close} color={IconColor.white} size={IconSize.tiny} onClick={handleClick} />
				</Grid>
			</Grid>
		}
		placement="right-end"
		arrow
		open={isOpen}
		onClick={handleClick}
		componentsProps={{
			popper: {
				className: style.popper,
			},
			tooltip: {
				className: style.tooltip,
			},
			arrow: {
				className: style.arrow,
			},
		}}
		className={style.reminderTooltip}
	>
		{children}
	</Tooltip>
);

type TReminderTooltipProps = {
	title: string;
	isOpen?: boolean;
	handleClick?: () => void;
	children: ReactElement;
};

export default ReminderTooltip;
