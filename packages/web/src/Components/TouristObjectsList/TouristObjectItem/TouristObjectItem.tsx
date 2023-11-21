import React, {useCallback, useState} from 'react';
import {Grid, SelectChangeEvent, Typography} from '@mui/material';
import {map} from 'lodash';

import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';
import {Icon, IconColor, IconType} from '@infomat/uikit/src/Icon';
import ActionMenuItem from '@infomat/uikit/src/ActionMenu/ActionMenuItem/ActionMenuItem';

import useRouterLinkForMui from 'src/Utils/Navigation/useRouterLinkForMui';
import {Routes} from 'src/Routes/Routes';

import style from './TouristObjectItem.module.scss';

type TSubcategory = {
	id: string;
	label: string;
	background: string;
	icon: string;
};

const TouristObjectItem = ({onDelete, touristObjectVM, isRemoveRecommend}: TTouristObjectItemProps) => {
	const TouristObjectEditLink = useRouterLinkForMui(Routes.touristObject(touristObjectVM.id));

	return (
		<Grid container className={style.container} direction="row" spacing={1}>
			<Grid item xs={1} md={0.5}>
				<Typography className={style.title}>ID</Typography>
			</Grid>
			<Grid item xs={2} md={1.5} container justifyContent="flex-end">
				<img src={touristObjectVM.background} className={style.img} />
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
				<ActionMenuItem
					deleteTitle={isRemoveRecommend ? 'Убрать из рекомендуем' : undefined}
					editLink={TouristObjectEditLink}
					onDelete={onDelete}
				/>
			</Grid>
		</Grid>
	);
};

type TTouristObjectItemProps = {
	touristObjectVM: TSubcategory;
	onDelete?: PropertyHandler;
	isRemoveRecommend?: boolean;
};

export default TouristObjectItem;
