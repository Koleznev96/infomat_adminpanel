import React, {useRef, ReactNode} from 'react';
import {Typography, Paper, ClickAwayListener, Popper, Grid, MenuItem} from '@mui/material';

import {useBooleanState} from '@infomat/core/src/Hooks/useBooleanState';
import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';

import style from './PopperField.module.scss';

const PopperField = ({label, children, placeholder, error, value, isShow, open, close, toggle}: TPopperFieldProps) => {
	const anchorEl = useRef<HTMLDivElement>(null);

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

	return (
		<Grid container direction="column">
			{label && <Typography className={style.label}>{label}</Typography>}
			<div className={style.boxInput} ref={anchorEl} onClick={open}>
				{value ? (
					<Typography className={style.value}>{value}</Typography>
				) : (
					<Typography className={style.placeholder}>{placeholder}</Typography>
				)}
			</div>
			{error && error.length && <Typography className={style.error}>{error}</Typography>}
			<Popper popperOptions={popperOptions} placement={'bottom-start'} anchorEl={anchorEl.current} open={isShow}>
				<ClickAwayListener onClickAway={close} mouseEvent="onPointerDown" disableReactTree touchEvent={false}>
					<Paper sx={{boxShadow: 8}}>{children}</Paper>
				</ClickAwayListener>
			</Popper>
		</Grid>
	);
};

type TPopperFieldProps = {
	label?: string;
	value?: string;
	children?: ReactNode;
	placeholder?: string;
	error?: string;
	isShow?: boolean;
	open: PropertyHandler;
	close: PropertyHandler;
	toggle: PropertyHandler;
};

export default PopperField;
