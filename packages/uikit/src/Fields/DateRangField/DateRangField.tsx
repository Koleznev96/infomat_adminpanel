import React, {useState} from 'react';
import {Typography, Grid} from '@mui/material';
import InputMask from 'react-input-mask';

import style from './DateRangField.module.scss';
import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';
import classNames from 'classnames';

function isValidDate(dateString: string): boolean {
	// Разделяем строку на элементы даты
	const [day, month, year] = dateString.split('.');

	// Создаем объект Date, передавая элементы даты в обратном порядке (год, месяц, день)
	const date = new Date(`${year}-${month}-${day}`);
	// Проверяем, является ли дата не NaN и значения дня, месяца и года соответствуют введенным значениям
	return (
		!isNaN(date.getTime()) && date.getDate() === +day && date.getMonth() === +month - 1 && date.getFullYear() === +year
	);
}

function isValidDateNow(dateString: string): boolean {
	// Разделяем строку на элементы даты
	const [day, month, year] = dateString.split('.');

	// Создаем объект Date, передавая элементы даты в обратном порядке (год, месяц, день)
	const date = new Date(`${year}-${month}-${day}`);

	const nowDate = new Date();
	// Проверяем, является ли дата не NaN и значения дня, месяца и года соответствуют введенным значениям
	return date.getTime() >= nowDate.getTime();
}

function replaceAll(str: string | undefined) {
	if (!str) {
		return '';
	}
	const [year, month, day] = str.split('-');
	return [day, month, year].join('.');
}

function replaceAllReset(str: string | undefined) {
	if (!str) {
		return '';
	}
	const [day, month, year] = str.split('.');
	return [year, month, day].join('-');
}

const DateRangField = ({startValue, endValue, setStartValue, setEndValue, label}: TDateRangFieldProps) => {
	const [error, setError] = useState('');
	const [errort, setErrort] = useState('');
	const [statrV, setStatrV] = useState(replaceAll(startValue));
	const [endV, setEndV] = useState(replaceAll(endValue));
	const [isFocus, setIsFocus] = useState(false);

	const changeStartvalue = () => {
		setIsFocus(false);
		if (statrV === '  .  .    ') {
			setError('');
			setStartValue('');
			return;
		}
		if (isValidDate(statrV)) {
			// if (!isValidDateNow(statrV)) {
			// 	setEndValue('');
			// 	setError('Дата должна быть не позднее текущего числа');
			// 	return;
			// }
			setError('');
			setStartValue(replaceAllReset(statrV));
		} else {
			setStartValue('');
			setError('Не верный формат даты');
		}
	};

	const changeEndvalue = () => {
		setIsFocus(false);
		if (endV === '  .  .    ') {
			setErrort('');
			setEndValue('');
			return;
		}
		if (isValidDate(endV)) {
			if (!isValidDateNow(endV)) {
				setEndValue('');
				setErrort('Дата должна быть не позднее текущего числа');
				return;
			}
			setErrort('');
			setEndValue(replaceAllReset(endV));
		} else {
			setEndValue('');
			setErrort('Не верный формат даты');
		}
	};

	return (
		<Grid container direction="column">
			{label && <Typography className={style.label}>{label}</Typography>}
			<div className={classNames(style.select, {[style.focus]: isFocus})}>
				<InputMask
					className={style.input}
					placeholder="11.11.2023"
					mask="99.99.9999"
					maskChar=" "
					onFocus={() => setIsFocus(true)}
					onBlur={changeStartvalue}
					value={statrV}
					onChange={(e) => setStatrV(e.target.value)}
				/>
				<div className={style.sep}>-</div>
				<InputMask
					className={style.input}
					placeholder="12.11.2023"
					mask="99.99.9999"
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

type TDateRangFieldProps = {
	placeholder?: string;
	label?: string;
	startValue?: string;
	endValue?: string;
	setStartValue: PropertyHandler<string>;
	setEndValue: PropertyHandler<string>;
};

export default DateRangField;
