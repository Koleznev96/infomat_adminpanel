import React, {useCallback} from 'react';
import {Grid, Typography} from '@mui/material';

import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';
import {Icon, IconColor, IconType} from '@infomat/uikit/src/Icon';
import ActionMenuItem from '@infomat/uikit/src/ActionMenu/ActionMenuItem/ActionMenuItem';
import {TEventsVM} from '@infomat/core/src/Redux/Events/entityAdapter';

import useRouterLinkForMui from 'src/Utils/Navigation/useRouterLinkForMui';
import {Routes} from 'src/Routes/Routes';

import style from './EventsItem.module.scss';

function replaceAll(str: string | undefined) {
	if (!str) {
		return '';
	}
	const [year, month, day] = str.split('-');
	return [day, month, year].join('.');
}

const EventsItem = ({onDelete, eventVM, id}: TEventsItemProps) => {
	const EventEditLink = useRouterLinkForMui(Routes.event(id));

	const deleteEvent = useCallback(() => {
		onDelete({id});
	}, [onDelete, id]);

	const statusTitle = eventVM.status === 'DRAFT' ? 'Черновик' : 'Опубликовано';
	const statusIcon = eventVM.status === 'DRAFT' ? IconType.clock : IconType.time;

	return (
		<Grid container className={style.container} direction="row" spacing={1}>
			<Grid item xs={1} md={0.5}>
				<Typography className={style.title}>{eventVM.id}</Typography>
			</Grid>
			<Grid item xs={2} md={2}>
				<Typography className={style.title}>{`${replaceAll(eventVM.startDate)}${
					eventVM.endDate ? '-' + replaceAll(eventVM.endDate) : ''
				}`}</Typography>
			</Grid>
			<Grid item xs={1} md={0.5}>
				<Typography className={style.title}>{`${eventVM.startTime}${
					eventVM.endTime ? '-' + eventVM.endTime : ''
				}`}</Typography>
			</Grid>
			<Grid item xs={1.5} md={1.5} container justifyContent="flex-end">
				<img src={eventVM.cover.url3x2} className={style.img} />
			</Grid>
			<Grid item xs={3} md={5}>
				<Typography className={style.title}>{eventVM.title}</Typography>
			</Grid>
			<Grid item container xs={2} md={1}>
				<div className={style.filter}>
					<Icon type={statusIcon} color={IconColor.white} />
					<Typography className={style.title}>{statusTitle}</Typography>
				</div>
			</Grid>
			<Grid item xs={1.5} md={1.5} container justifyContent="flex-end">
				<ActionMenuItem editLink={EventEditLink} onDelete={deleteEvent} />
			</Grid>
		</Grid>
	);
};

type TEventsItemProps = {
	id: number;
	eventVM: TEventsVM;
	onDelete: PropertyHandler<{id: number}>;
};

export default EventsItem;
