import React from 'react';
import {Grid, Typography} from '@mui/material';

import InfomatLogo from 'src/Assets/Images/infomat_logo.png';
import ProfileContainer from 'src/Components/Profile/ProfileContainer';

import style from './Information.module.scss';

const Information = () => {
	return (
		<Grid container direction="row" justifyContent="space-between" alignItems="center" paddingBottom={3}>
			<Grid item alignItems="center" gap={2.5} className={style.wrapper}>
				<img src={InfomatLogo} alt="Infomat Logo" className={style.logo} />
				<Typography className={style.title}>Панель управления </Typography>
			</Grid>
			<Grid item>
				<ProfileContainer />
			</Grid>
		</Grid>
	);
};

export default Information;
