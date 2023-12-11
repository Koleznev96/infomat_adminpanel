import React, {useCallback} from 'react';
import {Grid, Typography} from '@mui/material';

import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';
import ActionMenuItem from '@infomat/uikit/src/ActionMenu/ActionMenuItem/ActionMenuItem';

import useRouterLinkForMui from 'src/Utils/Navigation/useRouterLinkForMui';
import {Routes} from 'src/Routes/Routes';

import style from './TouristRoutItem.module.scss';
import {Icon, IconColor, IconType} from '@infomat/uikit/src/Icon';
import {TRoutesVM} from '@infomat/core/src/Redux/Routes/entityAdapter';

const TouristRoutItem = ({id, onDelete, touristRoutVM}: TTouristRoutItemProps) => {
	const TouristRoutEditLink = useRouterLinkForMui(Routes.touristRout(id));

	const deletePlaces = useCallback(() => {
		onDelete({id});
	}, [onDelete, id]);

	const statusTitle = touristRoutVM.status === 'DRAFT' ? 'Черновик' : 'Опубликовано';
	const statusIcon = touristRoutVM.status === 'DRAFT' ? IconType.clock : IconType.time;

	return (
		<Grid container className={style.container} direction="row" spacing={1}>
			<Grid item xs={1} md={0.5}>
				<Typography className={style.title}>{touristRoutVM.id}</Typography>
			</Grid>
			<Grid item xs={2} md={1.5} container justifyContent="flex-end">
				<div className={style.background} style={{backgroundColor: touristRoutVM.backgroundColor}}>
					<img src={touristRoutVM.icon.url} className={style.icon} />
				</div>
			</Grid>
			<Grid item xs={5} md={7}>
				<Typography className={style.title}>{touristRoutVM.title}</Typography>
			</Grid>
			<Grid item container xs={2} md={1}>
				<div className={style.filter}>
					<Icon type={statusIcon} color={IconColor.white} />
					<Typography className={style.title}>{statusTitle}</Typography>
				</div>
			</Grid>
			<Grid item xs={2} md={2} container justifyContent="flex-end">
				<ActionMenuItem editLink={TouristRoutEditLink} onDelete={deletePlaces} />
			</Grid>
		</Grid>
	);
};

type TTouristRoutItemProps = {
	id: number;
	touristRoutVM: TRoutesVM;
	onDelete: PropertyHandler<{id: number}>;
};

export default TouristRoutItem;
