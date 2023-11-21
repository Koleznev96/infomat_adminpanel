import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import {Typography} from '@mui/material';

import useCountdownTimer, {TCountdownTimerStatus} from '@infomat/uikit/src/Hooks/useCountdownTimer';

import style from './CountdownTimer.module.scss';

const CountdownTimer = ({isVertical, title, isTimeOverTitle, endTimeMillis}: TCountdownTimerProps) => {
	const countdownTimerParams: TCountdownTimerStatus = useCountdownTimer(endTimeMillis);

	const classes = classNames([style.value, {[style.isTimeOver]: countdownTimerParams.isTimeOver}]);

	const titleTimer = countdownTimerParams.isTimeOver ? isTimeOverTitle : title;

	if (isVertical) {
		return (
			<span className={style.countdownTimerVertical}>
				<Typography variant="body2" className={style.title} noWrap={true}>
					{titleTimer}
				</Typography>
				<Typography variant="body2" className={classes}>
					{moment.duration(countdownTimerParams.durationMillis).format('hh:mm:ss', {trim: false})}
				</Typography>
			</span>
		);
	}

	return (
		<span className={style.countdownTimer}>
			<Typography variant="body1" className={style.title}>
				{titleTimer}
			</Typography>
			<Typography variant="body1" className={classes}>
				{moment.duration(countdownTimerParams.durationMillis).format('hh:mm:ss', {trim: false})}
			</Typography>
		</span>
	);
};

type TCountdownTimerProps = {
	isVertical: boolean;
	title: string;
	isTimeOverTitle: string;
	endTimeMillis: number;
};

export default CountdownTimer;
