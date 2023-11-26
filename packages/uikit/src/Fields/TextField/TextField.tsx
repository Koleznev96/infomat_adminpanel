import React from 'react';
import {TextField as MuiTextField, TextFieldProps, Typography, Grid} from '@mui/material';

import {Icon, IconSize, IconType} from '@infomat/uikit/src/Icon';

import style from './TextField.module.scss';

const TextField = ({helperText, label, ...restProps}: TextFieldProps) => {
	return (
		<Grid container direction="column">
			{label && <Typography className={style.label}>{label}</Typography>}
			<MuiTextField
				{...restProps}
				helperText={
					helperText &&
					restProps.error && (
						<>
							<Icon type={IconType.warning} size={IconSize.tiny} /> {helperText}
						</>
					)
				}
			/>
		</Grid>
	);
};

export default TextField;
