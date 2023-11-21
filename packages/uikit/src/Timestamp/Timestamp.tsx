import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Tooltip} from '@mui/material';
import moment from 'moment';
import _ from 'lodash';

const FORMAT_DEFAULT: TDateFormat = {
	sameDay: 'LT',
	generic: 'L',
	long: 'LLLL',
};

const oneMinute = 60000;

const Timestamp = ({time, isForceTimeOnly = false, placement = 'right', onClick, format}: TTimestampProps) => {
	const [currentTime, setCurrentTime] = useState(new Date());

	const dateFormat = useMemo((): TDateFormat => _.assign({}, FORMAT_DEFAULT, format), [format]);

	const isSameDay = useCallback(() => {
		return (
			currentTime.getDate() === time.getDate() &&
			currentTime.getMonth() === time.getMonth() &&
			currentTime.getFullYear() === time.getFullYear()
		);
	}, [currentTime, time]);

	const getFormatted = useCallback(() => {
		const diff = currentTime.getTime() - time.getTime();

		if (diff <= oneMinute) {
			return 'date:now';
		}

		if (diff <= oneMinute * 59) {
			return moment(time).fromNow();
		}

		if (isSameDay() || isForceTimeOnly) {
			return moment(time).format(dateFormat.sameDay);
		}

		const yesterday = new Date(new Date().setDate(currentTime.getDate() - 1));

		if (
			yesterday.getDate() === time.getDate() &&
			yesterday.getMonth() === time.getMonth() &&
			yesterday.getFullYear() === time.getFullYear()
		) {
			return 'date:yesterday';
		}

		return moment(time).format(dateFormat.generic);
	}, [currentTime, dateFormat, isForceTimeOnly, isSameDay, time]);

	useEffect(() => {
		const timer = setInterval(() => setCurrentTime(new Date()), oneMinute);

		return () => {
			if (timer) {
				clearInterval(timer);
			}
		};
	}, [time, format]);

	const formattedTime = getFormatted();

	return (
		<Tooltip title={moment(time).format(dateFormat.long)} placement={placement} onClick={onClick}>
			<time>{formattedTime}</time>
		</Tooltip>
	);
};

type TTimestampProps = {
	time: Date;
	isForceTimeOnly?: boolean;
	placement?: 'left' | 'right';
	onClick?: () => void;
	format?: TDateFormat;
};

type TDateFormat = {
	sameDay?: string;
	generic?: string;
	long?: string;
};

export default Timestamp;
