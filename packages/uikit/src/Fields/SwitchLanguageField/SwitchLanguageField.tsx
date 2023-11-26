import React from 'react';
import {Typography} from '@mui/material';
import classNames from 'classnames';
import _ from 'lodash';

import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';
import {Icon, IconType} from '@infomat/uikit/src/Icon';

import style from './SwitchLanguageField.module.scss';

const items = [
	{icon: IconType.ru, valueLeng: 'ru', label: 'РУ'},
	{icon: IconType.en, valueLeng: 'en', label: 'EN'},
];

const SwitchLanguageField = ({value = 'ru', onChange}: TSwitchLanguageFieldProps) => {
	return (
		<div className={style.container}>
			{_.map(items, ({icon, label, valueLeng}) => (
				<div
					onClick={() => onChange(valueLeng)}
					key={label}
					className={classNames(style.button, {[style.isActive]: valueLeng === value})}
				>
					<Icon type={icon} className={style.icon} />
					<Typography className={style.label}>{label}</Typography>
				</div>
			))}
		</div>
	);
};

type TSwitchLanguageFieldProps = {
	value?: string;
	onChange: PropertyHandler<string>;
};

export default SwitchLanguageField;
