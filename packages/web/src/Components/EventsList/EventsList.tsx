import React, {useState} from 'react';
import {Grid, Typography} from '@mui/material';
import {map, noop} from 'lodash';

import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';
import PageListIteration from '@infomat/uikit/src/PageListIteration/PageListIteration';
import FilterMenuItem from '@infomat/uikit/src/ActionMenu/FilterMenuItem/FilterMenuItem';

import useRouterLinkForMui from 'src/Utils/Navigation/useRouterLinkForMui';
import {Routes} from 'src/Routes/Routes';

import style from './EventsList.module.scss';
import EventsItemContainer from './EventsItem/EventsItemContainer';

const itemIdsConst = ['asds', 'sdfg', 'dsfg', '896', 'cxvb', 'q', 'a', 's', 'd'];

const EventsList = ({
	itemIds = itemIdsConst,
	onAscStatus,
	onDecStatus,
	onResetStatus,
	onAscDate,
	onDecDate,
	onResetDate,
}: TEventsListProps) => {
	const EventCreateLink = useRouterLinkForMui(Routes.event());
	const [search, setSearch] = useState('');

	return (
		<PageListIteration
			labelAdd="Добавить объект"
			chengeSearch={setSearch}
			addLink={EventCreateLink}
			onLoadPage={noop}
			changeValueLimit={noop}
			// isLoading
		>
			<Grid container className={style.table} direction="column">
				<Grid item container className={style.header} direction="row" spacing={1}>
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
				</Grid>
				<div className={style.container}>
					{map(itemIds, (id) => (
						<EventsItemContainer key={id} id={id} />
					))}
				</div>
			</Grid>
		</PageListIteration>
	);
};

type TEventsListProps = {
	login?: string;
	onAscStatus: PropertyHandler;
	onDecStatus: PropertyHandler;
	onResetStatus: PropertyHandler;
	onAscDate: PropertyHandler;
	onDecDate: PropertyHandler;
	onResetDate: PropertyHandler;
	itemIds?: string[];
};

export default EventsList;
