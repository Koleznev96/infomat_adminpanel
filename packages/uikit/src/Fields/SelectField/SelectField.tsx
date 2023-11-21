import React from 'react';
import {Select, SelectProps, Typography, Grid, MenuItem, InputLabel, FormControl} from '@mui/material';
import {isUndefined, filter} from 'lodash';

import {Icon, IconSize, IconType} from '@infomat/uikit/src/Icon';

import style from './SelectField.module.scss';
import Dashboard from '../../Dashboard/Dashboard';
import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';
import classNames from 'classnames';

const names = [
	{label: 'Oliver Hansen', icon: IconType.add},
	{label: 'Oliver Ha8nsen', icon: IconType.add},
	{label: 'Oliver H64ansen', icon: IconType.add},
	{label: 'Oliver Htuan0sen', icon: IconType.add},
	{label: 'Oliverty Hansen', icon: IconType.add},
	{label: 'Oliver H6ansen', icon: IconType.add},
	{label: 'Oliver5 Hansen', icon: IconType.add},
	{label: 'Oliver H3ansen', icon: IconType.add},
	{label: 'Oliver 4Hansen', icon: IconType.add},
	{label: 'Oliver 2Hansen', icon: IconType.add},
	{label: 'Oli1ver Hansen', icon: IconType.add},
	{label: 'O1liver Hansen', icon: IconType.add},
	{label: 'Oliver Hans0en', icon: IconType.add},
];

const ITEM_HEIGHT = 32;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
		},
	},
};

const SelectField = ({
	isFilterItems,
	label,
	placeholder,
	items = names,
	value,
	onChange,
	...restProps
}: TSelectField) => {
	const filterItems = isFilterItems && value ? filter(items, (item) => item.label !== value.label) : items;
	return (
		<Grid container direction="column" className={style.root}>
			{label && <Typography className={style.label}>{label}</Typography>}
			<FormControl>
				<Dashboard
					RootComponent={
						<div className={style.select}>
							{value ? (
								<div className={style.item}>
									{value.icon && <Icon type={value.icon} size={IconSize.tiny} />}
									<Typography className={style.itemLabel}>{value.label}</Typography>
								</div>
							) : (
								<Typography className={style.placeholder}>{placeholder}</Typography>
							)}
							<Icon className={style.iconValue} type={IconType.keyboardArrowDown} />
						</div>
					}
				>
					{filterItems.map((item, index) => (
						<MenuItem
							key={index}
							value={label}
							onClick={() => onChange(item)}
							classes={{root: classNames(style.item, {[style.isSelect]: item.label === value?.label})}}
						>
							{item.icon && <Icon type={item.icon} size={IconSize.tiny} />}
							<Typography className={style.itemLabel}>{item.label}</Typography>
						</MenuItem>
					))}
				</Dashboard>

				{/* {isUndefined(value) && <InputLabel shrink={false}>{placeholder}</InputLabel>}
				<Select value={startValue} className={style.select} MenuProps={MenuProps} {...restProps}>
					{filterItems.map(({icon, label}, index) => (
						<MenuItem key={index} value={label} classes={{root: style.item}}>
							{icon && <Icon type={icon} size={IconSize.tiny} />}
							<Typography className={style.itemLabel}>{label}</Typography>
						</MenuItem>
					))}
				</Select> */}
			</FormControl>
		</Grid>
	);
};

type TSelectField = {
	items?: {icon?: IconType; label: string}[];
	// startValue?: {icon?: IconType; label: string};
	isFilterItems?: boolean;
	onChange: PropertyHandler<{icom?: IconType; label: string}>;
	label?: string;
	placeholder?: string;
	value?: {icon?: IconType; label: string};
};

export default SelectField;
