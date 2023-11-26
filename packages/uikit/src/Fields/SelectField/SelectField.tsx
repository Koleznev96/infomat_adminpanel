import React from 'react';
import {CircularProgress, Typography, Grid, MenuItem, FormControl} from '@mui/material';
import _ from 'lodash';
import classNames from 'classnames';

import {Icon, IconType} from '@infomat/uikit/src/Icon';
import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';
import Dashboard from '@infomat/uikit/src/Dashboard/Dashboard';

import style from './SelectField.module.scss';

const SelectField = ({label, placeholder, items, value, onChange, isLoading}: TSelectField) => {
	const filterItems = _.filter(items, (item) => item.id !== value);
	const currentItem = _.find(items, (item) => item.id === value);

	return (
		<Grid container direction="column" className={style.root}>
			{label && <Typography className={style.label}>{label}</Typography>}
			<FormControl>
				<Dashboard
					RootComponent={
						<div className={style.select}>
							{!_.isUndefined(value) && currentItem ? (
								<div className={style.item}>
									{currentItem.icon && <img src={currentItem.icon.url} className={style.icon} />}
									<Typography className={style.itemLabel}>{currentItem.title}</Typography>
								</div>
							) : (
								<Typography className={style.placeholder}>{placeholder}</Typography>
							)}
							<Icon className={style.iconValue} type={IconType.keyboardArrowDown} />
						</div>
					}
				>
					{isLoading ? (
						<div className={style.boxLoading}>
							<CircularProgress size={22} />
						</div>
					) : (
						_.map(filterItems, (item, index) => (
							<MenuItem
								key={index}
								value={label}
								onClick={() => onChange(item.id)}
								classes={{root: classNames(style.item, {[style.isSelect]: item.id === value})}}
							>
								{item.icon && <img src={item.icon.url} className={style.icon} />}
								<Typography className={style.itemLabel}>{item.title}</Typography>
							</MenuItem>
						))
					)}
				</Dashboard>
			</FormControl>
		</Grid>
	);
};

type TSelectField = {
	items?: {title: string; id: string | number; icon?: {url?: string}}[];
	onChange: PropertyHandler<number | string>;
	label?: string;
	placeholder?: string;
	value?: number | string;
	isLoading?: boolean;
};

export default SelectField;
