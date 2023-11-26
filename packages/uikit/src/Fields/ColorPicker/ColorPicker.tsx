import React, {useEffect, useRef, useState} from 'react';
import {Typography, Paper, ClickAwayListener, Popper, Grid, MenuItem} from '@mui/material';

import TextField from '@infomat/uikit/src/Fields/TextField/TextField';

import style from './ColorPicker.module.scss';
import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';
import {useBooleanState} from '@infomat/core/src/Hooks/useBooleanState';
import {SketchPicker} from 'react-color';

const colorRegex = /^#[0-9A-Fa-f]{6}$/;

const ColorPicker = ({label, value = '', setValue}: TColorPickerProps) => {
	const anchorEl = useRef<HTMLDivElement>(null);
	const [isShow, open, close] = useBooleanState(false);
	const [color, setColor] = useState('');
	const [error, setError] = useState('');

	useEffect(() => {
		setColor(value);
	}, [value, setColor]);

	const popperOptions = {
		modifiers: [
			{
				name: 'offset',
				options: {
					offset: [0, 16],
				},
			},
		],
	};

	const handleBlur = () => {
		if (!colorRegex.test(color)) {
			setValue('');
			setError('Неверный формат цвета');
		} else {
			setError('');
			setValue(color);
		}
	};

	const changeColor = (value: string) => {
		setError('');
		setColor(value);
	};

	const changeClouse = () => {
		close();
		if (!colorRegex.test(color)) {
			setValue('');
			setError('Неверный формат цвета');
		} else {
			setError('');
			setValue(color);
		}
	};

	return (
		<Grid container direction="column">
			{label && <Typography className={style.label}>{label}</Typography>}
			<div className={style.boxInput} ref={anchorEl}>
				<TextField
					autoComplete="off"
					onFocus={open}
					onBlur={handleBlur}
					value={color}
					onChange={(e) => changeColor(e.target.value)}
					classes={{root: style.input}}
					placeholder="#0000FF"
					helperText={error && error?.length > 0 ? error : false}
					error={!!error && error.length > 0}
				/>
				<div className={style.boxColor} style={{backgroundColor: color}} onClick={open}></div>
			</div>
			<Popper popperOptions={popperOptions} placement={'bottom-start'} anchorEl={anchorEl.current} open={isShow}>
				<ClickAwayListener onClickAway={changeClouse} mouseEvent="onPointerDown" disableReactTree touchEvent={false}>
					<Paper
						sx={{
							boxShadow: 8,
						}}
					>
						<SketchPicker color={color} onChange={(e) => changeColor(e.hex)} />
					</Paper>
				</ClickAwayListener>
			</Popper>
		</Grid>
	);
};

type TColorPickerProps = {
	label?: string;
	value?: string;
	setValue: PropertyHandler<string>;
};

export default ColorPicker;
