import React, {useState} from 'react';
import {Grid, Typography} from '@mui/material';
import {map, noop} from 'lodash';

import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';
import PageListIteration from '@infomat/uikit/src/PageListIteration/PageListIteration';
import FilterMenuItem from '@infomat/uikit/src/ActionMenu/FilterMenuItem/FilterMenuItem';

import useRouterLinkForMui from 'src/Utils/Navigation/useRouterLinkForMui';
import {Routes} from 'src/Routes/Routes';

import style from './TouristObjectsList.module.scss';
import TouristObjectItemContainer from './TouristObjectItem/TouristObjectItemContainer';

const itemIdsConst = ['asds', 'sdfg', 'dsfg', '896', 'cxvb', 'q', 'a', 's', 'd'];

const TouristObjectsList = ({
	itemIds = itemIdsConst,
	onAscStatus,
	onDecStatus,
	onResetStatus,
	isRemoveRecommend,
}: TTouristObjectsListProps) => {
	const TouristObjectCreateLink = useRouterLinkForMui(Routes.touristObject());
	const [search, setSearch] = useState('');

	return (
		<PageListIteration
			labelAdd="Добавить объект"
			chengeSearch={setSearch}
			addLink={isRemoveRecommend ? undefined : TouristObjectCreateLink}
			onLoadPage={noop}
			changeValueLimit={noop}
			// isLoading
		>
			<Grid container className={style.table} direction="column">
				<Grid item container className={style.header}>
					<Grid item xs={1} md={0.5}>
						<Typography className={style.title}>ID</Typography>
					</Grid>
					<Grid item xs={2} md={1.5}></Grid>
					<Grid item xs={5} md={7}>
						<Typography className={style.title}>Название</Typography>
					</Grid>
					<Grid item container xs={2} md={1}>
						<FilterMenuItem title={'Статус'} onAsc={onAscStatus} onDec={onDecStatus} onReset={onResetStatus} />
					</Grid>
					<Grid item xs={2} md={2}></Grid>
				</Grid>
				<div className={style.container}>
					{map(itemIds, (id) => (
						<TouristObjectItemContainer isRemoveRecommend={isRemoveRecommend} key={id} id={id} />
					))}
				</div>
			</Grid>
		</PageListIteration>
	);
};

type TTouristObjectsListProps = {
	login?: string;
	onAscStatus: PropertyHandler;
	onDecStatus: PropertyHandler;
	onResetStatus: PropertyHandler;
	isRemoveRecommend?: boolean;
	itemIds?: string[];
};

export default TouristObjectsList;
