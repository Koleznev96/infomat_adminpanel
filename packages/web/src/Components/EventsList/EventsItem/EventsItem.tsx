import React, {useCallback, useState} from 'react';
import {Grid, SelectChangeEvent, Typography} from '@mui/material';
import {map} from 'lodash';

import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';
import {Icon, IconColor, IconType} from '@infomat/uikit/src/Icon';
import ActionMenuItem from '@infomat/uikit/src/ActionMenu/ActionMenuItem/ActionMenuItem';

import useRouterLinkForMui from 'src/Utils/Navigation/useRouterLinkForMui';
import {Routes} from 'src/Routes/Routes';

import style from './EventsItem.module.scss';

type TSubcategory = {
	id: string;
	label: string;
	background: string;
	icon: string;
};

const EventsItem = ({onDelete, eventVM}: TEventsItemProps) => {
	const EventEditLink = useRouterLinkForMui(Routes.event(eventVM.id));

	return (
		<Grid container className={style.container} direction="row" spacing={1}>
			<Grid item xs={1} md={0.5}>
				<Typography className={style.title}>ID</Typography>
			</Grid>
			<Grid item xs={2} md={2}>
				<Typography className={style.title}>01.10.2023-02.10.2023</Typography>
			</Grid>
			<Grid item xs={1} md={0.5}>
				<Typography className={style.title}>16:00-17:00</Typography>
			</Grid>
			<Grid item xs={1.5} md={1.5} container justifyContent="flex-end">
				<img src={eventVM.background} className={style.img} />
			</Grid>
			<Grid item xs={3} md={5}>
				<Typography className={style.title}>Название</Typography>
			</Grid>
			<Grid item container xs={2} md={1}>
				<div className={style.filter}>
					<Icon type={IconType.chevronsDownUp} color={IconColor.white} />
					<Typography className={style.title}>Статус</Typography>
				</div>
			</Grid>
			<Grid item xs={1.5} md={1.5} container justifyContent="flex-end">
				<ActionMenuItem editLink={EventEditLink} onDelete={onDelete} />
			</Grid>

			{/* <Grid item container className={style.header} direction="row" spacing={1}>
					<Grid item xs={1} md={0.5}>
						<Typography className={style.title}>ID</Typography>
					</Grid>
					<Grid item container xs={2} md={2}>
						<FilterMenuItem title={'Дата'} onAsc={onAscStatus} onDec={onDecStatus} onReset={onResetStatus} />
					</Grid>
					<Grid item xs={1} md={0.5}>
						<Typography className={style.title}>Время</Typography>
					</Grid>
					<Grid item xs={1.5} md={1.5}></Grid>
					<Grid item xs={3} md={5}>
						<Typography className={style.title}>Название</Typography>
					</Grid>
					<Grid item container xs={2} md={1}>
						<FilterMenuItem title={'Статус'} onAsc={onAscStatus} onDec={onDecStatus} onReset={onResetStatus} />
					</Grid>
					<Grid item xs={1.5} md={1.5}></Grid>
				</Grid> */}
		</Grid>
	);
};

type TEventsItemProps = {
	eventVM: TSubcategory;
	onDelete?: PropertyHandler;
};

export default EventsItem;
