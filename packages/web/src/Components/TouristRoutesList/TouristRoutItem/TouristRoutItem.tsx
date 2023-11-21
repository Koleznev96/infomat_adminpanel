import React, {useCallback, useState} from 'react';
import {Grid, SelectChangeEvent, Typography} from '@mui/material';
import {map} from 'lodash';

import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';
import ActionMenuItem from '@infomat/uikit/src/ActionMenu/ActionMenuItem/ActionMenuItem';

import useRouterLinkForMui from 'src/Utils/Navigation/useRouterLinkForMui';
import {Routes} from 'src/Routes/Routes';

import style from './TouristRoutItem.module.scss';
import {Icon, IconColor, IconType} from '@infomat/uikit/src/Icon';

type TCategoryObject = {
	id: string;
	label: string;
	background: string;
	icon: string;
};

const TouristRoutItem = ({onDelete, touristRoutVM}: TTouristRoutItemProps) => {
	const TouristRoutEditLink = useRouterLinkForMui(Routes.touristRout(touristRoutVM.id));

	return (
		// <div className={style.container}>
		// 	<div className={style.box}>
		// 		<img src={categoryObjectVM.background} className={style.layout} />
		// 		<img src={categoryObjectVM.icon} className={style.icon} />
		// 	</div>
		// 	<Typography className={style.label}>{categoryObjectVM.label}</Typography>
		// 	<ActionMenuItem editLink={TouristRoutEditLink} onDelete={onDelete} />
		// </div>
		<Grid container className={style.container} direction="row" spacing={1}>
			<Grid item xs={1} md={0.5}>
				<Typography className={style.title}>ID</Typography>
			</Grid>
			<Grid item xs={2} md={1.5} container justifyContent="flex-end">
				<div className={style.background}>
					<img src={touristRoutVM.icon} className={style.icon} />
				</div>
			</Grid>
			<Grid item xs={5} md={7}>
				<Typography className={style.title}>Название</Typography>
			</Grid>
			<Grid item container xs={2} md={1}>
				<div className={style.filter}>
					<Icon type={IconType.chevronsDownUp} color={IconColor.white} />
					<Typography className={style.title}>Статус</Typography>
				</div>
			</Grid>
			<Grid item xs={2} md={2} container justifyContent="flex-end">
				<ActionMenuItem editLink={TouristRoutEditLink} onDelete={onDelete} />
			</Grid>
		</Grid>
	);
};

type TTouristRoutItemProps = {
	touristRoutVM: TCategoryObject;
	onDelete?: PropertyHandler;
};

export default TouristRoutItem;
