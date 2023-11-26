import React from 'react';
import {MenuItem, Typography} from '@mui/material';

import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';
import Dashboard from '@infomat/uikit/src/Dashboard/Dashboard';

import style from './Profile.module.scss';
import {Icon, IconSize, IconType} from '@infomat/uikit/src/Icon';

const Profile = ({onLogout, login}: TProfileProps) => {
	return (
		<div className={style.container}>
			<Dashboard label="Администратор" title={login}>
				<MenuItem classes={{root: style.item}} onClick={onLogout}>
					<Icon type={IconType.logout} size={IconSize.tiny} />
					<Typography className={style.title}>Выход</Typography>
				</MenuItem>
			</Dashboard>
		</div>
	);
};

type TProfileProps = {
	onLogout: PropertyHandler;
	login?: string;
};

export default Profile;
