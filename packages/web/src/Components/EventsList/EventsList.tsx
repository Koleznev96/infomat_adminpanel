import React, {useCallback} from 'react';
import {Grid, Typography} from '@mui/material';
import _ from 'lodash';

import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';
import PageListIteration from '@infomat/uikit/src/PageListIteration/PageListIteration';
import FilterMenuItem from '@infomat/uikit/src/ActionMenu/FilterMenuItem/FilterMenuItem';

import useRouterLinkForMui from 'src/Utils/Navigation/useRouterLinkForMui';
import {Routes} from 'src/Routes/Routes';

import style from './EventsList.module.scss';
import EventsItemContainer from './EventsItem/EventsItemContainer';

const itemIdsConst = ['asds', 'sdfg', 'dsfg', '896', 'cxvb', 'q', 'a', 's', 'd'];

const EventsList = ({
	getData,
	eventsIds,
	error,
	currentPage,
	totalPage,
	size,
	isLoading,
	search,
	status,
	startDate,
}: TEventsListProps) => {
	const EventCreateLink = useRouterLinkForMui(Routes.event());

	const wrapperGetData = useCallback(
		({restFilters, ...data}: {page?: number; size?: number; search?: string; restFilters?: boolean}) => {
			if (restFilters === true) {
				getData({...data, status: null});
			} else {
				getData(data);
			}
		},
		[getData],
	);

	const onAscStatus = useCallback(() => {
		getData({status: 'PUBLISHED', page: 0, search: ''});
	}, [getData]);

	const onDecStatus = useCallback(() => {
		getData({status: 'DRAFT', page: 0, search: ''});
	}, [getData]);

	const onResetStatus = useCallback(() => {
		getData({status: null, page: 0});
	}, [getData]);

	const onAscDate = useCallback(() => {
		getData({startDate: true, page: 0, search: '', status: null});
	}, [getData]);

	const onDecDate = useCallback(() => {
		getData({startDate: false, page: 0, search: '', status: null});
	}, [getData]);

	const onResetDate = useCallback(() => {
		getData({startDate: null, page: 0});
	}, [getData]);

	return (
		<PageListIteration
			numberPages={totalPage}
			startSearch={search}
			isLoading={isLoading}
			isEmptyList={_.isEmpty(eventsIds)}
			getData={wrapperGetData}
			labelAdd="Добавить мероприятие"
			addLink={EventCreateLink}
			startCrrentPageNumber={currentPage}
			startValueLimit={size}
		>
			<Grid container className={style.table} direction="column">
				<Grid item container className={style.header} direction="row" spacing={1}>
					<Grid item xs={1} md={0.5}>
						<Typography className={style.title}>ID</Typography>
					</Grid>
					<Grid item container xs={2} md={2}>
						<FilterMenuItem
							isReset={!!(!_.isUndefined(startDate) && startDate !== null)}
							title={'Дата'}
							onAsc={onAscDate}
							onDec={onDecDate}
							onReset={onResetDate}
							placement="bottom-start"
							labels={['Asc', 'Desc', 'Reset']}
						/>
					</Grid>
					<Grid item xs={1} md={0.5}>
						<Typography className={style.title}>Время</Typography>
					</Grid>
					<Grid item xs={1.5} md={1.5}></Grid>
					<Grid item xs={3} md={5}>
						<Typography className={style.title}>Название</Typography>
					</Grid>
					<Grid item container xs={2} md={1}>
						<FilterMenuItem
							isReset={!!(!_.isUndefined(status) && status !== null && status.length)}
							title={'Статус'}
							onAsc={onAscStatus}
							onDec={onDecStatus}
							onReset={onResetStatus}
						/>
					</Grid>
					<Grid item xs={1.5} md={1.5}></Grid>
				</Grid>
				<div className={style.container}>
					{_.map(eventsIds, (id) => (
						<EventsItemContainer key={id} id={id} />
					))}
				</div>
			</Grid>
		</PageListIteration>
	);
};

type TEventsListProps = {
	eventsIds?: number[];
	currentPage: number;
	isLoading?: boolean;
	search: string;
	size: number;
	totalPage: number;
	error?: string;
	status?: string | null;
	startDate?: boolean | null;
	getData: PropertyHandler<{
		page?: number;
		size?: number;
		search?: string;
		status?: string | null;
		startDate?: boolean | null;
	}>;
};

export default EventsList;
