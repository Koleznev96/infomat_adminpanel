import classNames from 'classnames';
import React from 'react';
import {Typography, Grid} from '@mui/material';

import InfomatLogo from './infomat_logo.png';

import style from './Spinner.module.scss';

const Spinner = ({isGlobal, ...restProps}: TSpinnerProps) => {
	return (
		<div className={classNames({[style.spinner]: true, [style.global]: isGlobal})} {...restProps}>
			<Grid item alignItems="center" gap={2.5} className={style.wrapper}>
				<img src={InfomatLogo} alt="Infomat Logo" className={style.logo} />
				<Typography className={style.title}>Панель управления </Typography>
				{/* <CircularProgress size={38} /> */}
			</Grid>
		</div>
	);
};

type TSpinnerProps = {
	isGlobal?: boolean;
};

export default Spinner;
