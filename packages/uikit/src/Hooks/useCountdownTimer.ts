import {useEffect, useState} from 'react';
import _ from 'lodash';
import moment from 'moment';

export type TCountdownTimerStatus = {
	durationMillis: number;
	isTimeOver: boolean;
};

type TTimer = {
	id: number;
	subscribers: {({durationMillis, isTimeOver}: TCountdownTimerStatus): void}[];
};

const timers: Record<number, TTimer> = {};

const useCountdownTimer = (endTimeMillis: number | undefined) => {
	const [countdownTimerParams, setCountdownTimerParams] = useState<TCountdownTimerStatus>({
		durationMillis: 0,
		isTimeOver: false,
	});

	useEffect(() => {
		if (_.isUndefined(endTimeMillis)) {
			return;
		}

		if (!timers[endTimeMillis]) {
			timers[endTimeMillis] = {
				id: setInterval(() => {
					const isTimeOver = moment().isAfter(endTimeMillis);
					const durationMillis = Math.abs(endTimeMillis - Date.now());
					_.forEach(
						timers[endTimeMillis].subscribers,
						(subscriber: ({durationMillis, isTimeOver}: TCountdownTimerStatus) => void) =>
							subscriber({durationMillis, isTimeOver}),
					);
				}, 1000),
				subscribers: [setCountdownTimerParams],
			};
		} else {
			timers[endTimeMillis].subscribers.push(setCountdownTimerParams);
		}

		return () => {
			if (timers[endTimeMillis] && timers[endTimeMillis].subscribers.length) {
				_.remove(
					timers[endTimeMillis].subscribers,
					(subscriber: ({durationMillis, isTimeOver}: TCountdownTimerStatus) => void) =>
						subscriber === setCountdownTimerParams,
				);
			}
			if (timers[endTimeMillis] && timers[endTimeMillis].subscribers.length === 0) {
				clearInterval(timers[endTimeMillis].id);
				delete timers[endTimeMillis];
			}
		};
	}, [endTimeMillis]);

	return countdownTimerParams;
};

export default useCountdownTimer;
