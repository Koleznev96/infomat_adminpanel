import React, {useCallback} from 'react';
import {Grid, Typography} from '@mui/material';

import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';
import {Icon, IconColor, IconType} from '@infomat/uikit/src/Icon';
import ActionMenuItem from '@infomat/uikit/src/ActionMenu/ActionMenuItem/ActionMenuItem';
import {TPlacesVM} from '@infomat/core/src/Redux/Places/entityAdapter';

import useRouterLinkForMui from 'src/Utils/Navigation/useRouterLinkForMui';
import {Routes} from 'src/Routes/Routes';

import style from './TouristObjectItem.module.scss';

const TouristObjectItem = ({
	id,
	onDelete,
	touristObjectVM,
	isRemoveRecommend,
	onDeleteRecommend,
}: TTouristObjectItemProps) => {
	const TouristObjectEditLink = useRouterLinkForMui(Routes.touristObject(touristObjectVM.id));

	const deletePlaces = useCallback(() => {
		isRemoveRecommend ? onDeleteRecommend({id}) : onDelete({id});
	}, [onDelete, id]);

	const statusTitle = touristObjectVM.status === 'DRAFT' ? 'Черновик' : 'Опубликовано';
	const statusIcon = touristObjectVM.status === 'DRAFT' ? IconType.clock : IconType.time;

	return (
		<Grid container className={style.container} direction="row" spacing={1}>
			<Grid item xs={1} md={0.5}>
				<Typography className={style.title}>{touristObjectVM.id}</Typography>
			</Grid>
			<Grid item xs={2} md={1.5} container justifyContent="flex-end">
				<img src={touristObjectVM.cover.url3x2} className={style.img} />
			</Grid>
			<Grid item xs={5} md={7}>
				<Typography className={style.title}>{touristObjectVM.title}</Typography>
			</Grid>
			<Grid item container xs={2} md={1}>
				<div className={style.filter}>
					<Icon type={statusIcon} color={IconColor.white} />
					<Typography className={style.title}>{statusTitle}</Typography>
				</div>
			</Grid>
			<Grid item xs={2} md={2} container justifyContent="flex-end">
				<ActionMenuItem
					deleteTitle={isRemoveRecommend ? 'Убрать из рекомендуем' : undefined}
					editLink={TouristObjectEditLink}
					onDelete={deletePlaces}
				/>
			</Grid>
		</Grid>
	);
};

type TTouristObjectItemProps = {
	id: number;
	touristObjectVM: TPlacesVM;
	onDeleteRecommend: PropertyHandler<{id: number}>;
	isRemoveRecommend?: boolean;
	onDelete: PropertyHandler<{id: number}>;
};

export default TouristObjectItem;
