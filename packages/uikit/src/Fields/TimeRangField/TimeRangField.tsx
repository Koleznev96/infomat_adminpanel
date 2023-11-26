import React, {useState} from 'react';
import {Typography, Grid} from '@mui/material';
import InputMask from 'react-input-mask';

import style from './TimeRangField.module.scss';
import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';
import classNames from 'classnames';

function isValidDate(dateString: string): boolean {
	const timeRegex = /^(?:2[0-3]|[01][0-9]):[0-5][0-9]$/;
	return timeRegex.test(dateString);
}

const TimeRangField = ({startValue, endValue, setStartValue, setEndValue, label}: TTimeRangFieldProps) => {
	const [error, setError] = useState('');
	const [errort, setErrort] = useState('');
	const [statrV, setStatrV] = useState(startValue || '');
	const [endV, setEndV] = useState(endValue || '');
	const [isFocus, setIsFocus] = useState(false);

	const changeStartvalue = () => {
		setIsFocus(false);
		if (statrV === '  :  ') {
			setError('');
			setEndValue('');
			return;
		}
		if (isValidDate(statrV)) {
			setError('');
			setStartValue(statrV);
		} else {
			setStartValue('');
			setError('Не верный формат времени');
		}
	};

	const changeEndvalue = () => {
		setIsFocus(false);
		if (endV === '  :  ') {
			setErrort('');
			setEndValue('');
			return;
		}
		if (isValidDate(endV)) {
			setErrort('');
			setEndValue(endV);
		} else {
			setEndValue('');
			setErrort('Не верный формат времени');
		}
	};

	return (
		<Grid container direction="column">
			{label && <Typography className={style.label}>{label}</Typography>}
			<div className={classNames(style.select, {[style.focus]: isFocus})}>
				<InputMask
					className={style.input}
					placeholder="08:30"
					mask="99:99"
					maskChar=" "
					onFocus={() => setIsFocus(true)}
					onBlur={changeStartvalue}
					value={statrV}
					onChange={(e) => setStatrV(e.target.value)}
				/>
				<div className={style.sep}>-</div>
				<InputMask
					className={style.input}
					placeholder="10:00"
					mask="99:99"
					maskChar=" "
					value={endV}
					onFocus={() => setIsFocus(true)}
					onBlur={changeEndvalue}
					onChange={(e) => setEndV(e.target.value)}
				/>
			</div>
			{(error || errort) && <Typography className={style.error}>{error || errort}</Typography>}
		</Grid>
	);
};

type TTimeRangFieldProps = {
	placeholder?: string;
	label?: string;
	startValue?: string;
	endValue?: string;
	setStartValue: PropertyHandler<string>;
	setEndValue: PropertyHandler<string>;
};

export default TimeRangField;
